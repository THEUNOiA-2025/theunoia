import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { toast } from "sonner";
import { supabase } from "@/integrations/supabase/client";
import { Loader2, CheckCircle, Upload } from "lucide-react";

const ImportCollegesPage = () => {
  const [importing, setImporting] = useState(false);
  const [result, setResult] = useState<{ success: boolean; count?: number; error?: string } | null>(null);

  const handleImport = async () => {
    setImporting(true);
    setResult(null);
    
    try {
      // Fetch the CSV file
      const response = await fetch('/data/colleges.csv');
      const csvData = await response.text();
      
      console.log('CSV loaded, length:', csvData.length);
      
      // Call the edge function
      const { data, error } = await supabase.functions.invoke('import-colleges', {
        body: { csvData }
      });

      if (error) {
        throw error;
      }

      setResult(data);
      
      if (data.success) {
        toast.success(`Successfully imported ${data.count} colleges!`);
      } else {
        toast.error(data.error || 'Import failed');
      }
    } catch (error: unknown) {
      const errorMessage = error instanceof Error ? error.message : 'Unknown error';
      console.error('Import error:', error);
      setResult({ success: false, error: errorMessage });
      toast.error(errorMessage);
    } finally {
      setImporting(false);
    }
  };

  return (
    <div className="min-h-screen bg-background flex items-center justify-center p-4">
      <Card className="w-full max-w-md">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Upload className="h-5 w-5" />
            Import Colleges
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <p className="text-sm text-muted-foreground">
            This will clear existing colleges and import 53,244 colleges from the CSV file.
          </p>
          
          <Button 
            onClick={handleImport} 
            disabled={importing}
            className="w-full"
          >
            {importing ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                Importing... (this may take a minute)
              </>
            ) : (
              'Start Import'
            )}
          </Button>

          {result && (
            <div className={`p-4 rounded-lg ${result.success ? 'bg-green-500/10 text-green-500' : 'bg-destructive/10 text-destructive'}`}>
              {result.success ? (
                <div className="flex items-center gap-2">
                  <CheckCircle className="h-5 w-5" />
                  <span>Imported {result.count} colleges successfully!</span>
                </div>
              ) : (
                <span>Error: {result.error}</span>
              )}
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
};

export default ImportCollegesPage;
