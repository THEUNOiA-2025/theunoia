import { useEffect } from "react";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "@/contexts/AuthContext";
import { toast } from "sonner";
import { useNavigate } from "react-router-dom";
import { playNotificationSound } from "@/utils/notificationSound";

export const useGlobalMessageNotification = () => {
  const { user } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (!user?.id) return;

    const channel = supabase
      .channel('global-messages')
      .on(
        'postgres_changes',
        {
          event: 'INSERT',
          schema: 'public',
          table: 'messages',
        },
        async (payload) => {
          const newMessage = payload.new as {
            id: string;
            conversation_id: string;
            sender_id: string;
            content: string;
            created_at: string;
          };

          // Don't notify for own messages
          if (newMessage.sender_id === user.id) return;

          // Check if user is part of this conversation
          const { data: conversation, error: convError } = await supabase
            .from('conversations')
            .select('client_id, freelancer_id')
            .eq('id', newMessage.conversation_id)
            .single();

          if (convError || !conversation) return;

          // Only notify if user is client or freelancer in this conversation
          if (conversation.client_id !== user.id && conversation.freelancer_id !== user.id) {
            return;
          }

          // Fetch sender profile
          const { data: senderProfile } = await supabase
            .from('user_profiles')
            .select('first_name, last_name')
            .eq('user_id', newMessage.sender_id)
            .single();

          const senderName = senderProfile 
            ? `${senderProfile.first_name} ${senderProfile.last_name}`.trim() 
            : 'Someone';

          // Truncate message content for preview
          const preview = newMessage.content.length > 50 
            ? newMessage.content.substring(0, 50) + '...' 
            : newMessage.content;

          // Play notification sound
          playNotificationSound();

          // Show toast notification
          toast.info(`New message from ${senderName}`, {
            description: preview,
            action: {
              label: "View",
              onClick: () => navigate('/messages'),
            },
            duration: 5000,
          });
        }
      )
      .subscribe();

    return () => {
      supabase.removeChannel(channel);
    };
  }, [user?.id, navigate]);
};
