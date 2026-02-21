import { useParams, Link } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { Helmet } from "react-helmet-async";

import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";

import {
  ArrowLeft,
  Calendar,
  Clock,
  Share2
} from "lucide-react";

import { format } from "date-fns";
import { toast } from "sonner";

import { ImageGallery } from "@/components/ImageGallery";


/* TYPE */

interface Blog {
  id: string;
  title: string;
  slug: string;
  excerpt: string | null;
  content: string;
  cover_image_url: string | null;
  blog_images: string[] | null;
  meta_title: string | null;
  meta_description: string | null;
  canonical_url: string | null;
  published_at: string | null;
  created_at: string;
  faqs: Array<{ question: string; answer: string }> | null;
}



export default function BlogDetailPage() {

  const { slug } = useParams<{ slug: string }>();


  /* FETCH BLOG */

  const {

    data: blog,
    isLoading,
    error

  } = useQuery<Blog | null>({

    queryKey: ["blog", slug],

    queryFn: async () => {

      if (!slug) return null;

      const { data, error } =
        await supabase
          .from("blogs")
          .select("*")
          .eq("slug", slug)
          .eq("status", "published")
          .single();

      if (error) throw error;

      return data as unknown as Blog;

    },

    enabled: !!slug

  });



  /* SHARE */

  const handleShare = async () => {

    await navigator.clipboard.writeText(

      window.location.href

    );

    toast.success("Link copied");

  };



  /* LOADING */

  if (isLoading)

    return (

      <>

        <Header />

        <Skeleton className="h-screen" />

        <Footer />

      </>

    );



  /* ERROR */

  if (!blog || error)

    return (

      <>

        <Header />

        <div className="pt-40 text-center text-xl font-semibold">

          Article Not Found

        </div>

        <Footer />

      </>

    );



  /* SEO */

  const seoTitle =
    blog.meta_title ||
    `${blog.title} | THEUNOIA`;


  const seoDescription =
    blog.meta_description ||
    blog.excerpt ||
    "";


  const seoCanonical =
    blog.canonical_url ||
    `https://www.theunoia.com/blog/${blog.slug}`;



  /* UI */

  return (

    <>

      {/* SEO */}

      <Helmet>

        <title>

          {seoTitle}

        </title>


        <meta

          name="description"

          content={seoDescription}

        />


        <link

          rel="canonical"

          href={`https://www.theunoia.com/blog/${blog.slug}`}

        />

      </Helmet>



      <Header />



      <article className="pt-32 pb-16 px-4">


        <div className="max-w-4xl mx-auto">


          {/* BACK */}

          <Link to="/blog">

            <Button variant="ghost">

              <ArrowLeft className="mr-2 h-4 w-4"/>

              Back

            </Button>

          </Link>



          {/* TITLE */}

          <h1 className="text-5xl font-bold mt-6 mb-4">

            {blog.title}

          </h1>



          {/* META INFO */}

          <div className="flex gap-6 text-muted-foreground mb-8">


            <span className="flex items-center gap-2">

              <Calendar className="h-4 w-4"/>

              {format(

                new Date(

                  blog.published_at ||
                  blog.created_at

                ),

                "MMMM d, yyyy"

              )}

            </span>


            <span className="flex items-center gap-2">

              <Clock className="h-4 w-4"/>

              5 min read

            </span>


            <Button
              variant="ghost"
              onClick={handleShare}
            >

              <Share2 className="h-4 w-4 mr-2"/>

              Share

            </Button>


          </div>



          {/* COVER IMAGE */}

          {blog.cover_image_url && (

            <img

              src={blog.cover_image_url}

              alt={blog.title}

              className="rounded-xl mb-10"

            />

          )}



          {/* GALLERY */}

          {blog.blog_images &&
            blog.blog_images.length > 1 && (

              <ImageGallery

                images={blog.blog_images}

                coverImageUrl={blog.cover_image_url}

              />

          )}



          {/* EXCERPT */}

          {blog.excerpt && (

            <p className="italic mb-8 text-lg">

              {blog.excerpt}

            </p>

          )}



          {/* CONTENT — FINAL FIX */}

          <div
            className="
              prose
              prose-lg
              max-w-none
              prose-ul:list-disc
              prose-ul:pl-6
              prose-ol:list-decimal
              prose-ol:pl-6
              prose-li:mb-2
            "
            dangerouslySetInnerHTML={{
              __html: blog.content
            }}
          />

          {/* FAQ SECTION */}
          {blog.faqs && blog.faqs.length > 0 && (
            <section className="mt-16 border-t border-border pt-10">
              <h2 className="text-3xl font-bold mb-8">
                Frequently Asked Questions
              </h2>
              <div className="space-y-6">
                {blog.faqs.map((faq, index) => (
                  <details
                    key={index}
                    className="group rounded-xl border border-border bg-card overflow-hidden"
                    open={index === 0}
                  >
                    <summary className="flex cursor-pointer items-center justify-between gap-4 p-5 font-semibold text-lg hover:bg-muted/50 transition-colors list-none [&::-webkit-details-marker]:hidden">
                      <span>{faq.question}</span>
                      <svg
                        className="h-5 w-5 shrink-0 text-muted-foreground transition-transform duration-200 group-open:rotate-180"
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                        strokeWidth="2"
                        stroke="currentColor"
                      >
                        <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 8.25l-7.5 7.5-7.5-7.5" />
                      </svg>
                    </summary>
                    <div
                      className="px-5 pb-5 prose prose-sm max-w-none text-muted-foreground"
                      dangerouslySetInnerHTML={{ __html: faq.answer }}
                    />
                  </details>
                ))}
              </div>
            </section>
          )}

        </div>

      </article>



      <Footer />

    </>

  );

}