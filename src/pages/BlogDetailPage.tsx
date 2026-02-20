import { useParams, Link } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import { supabase } from '@/integrations/supabase/client';
import { Helmet } from "react-helmet-async";
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { Button } from '@/components/ui/button';
import { Skeleton } from '@/components/ui/skeleton';
import { ArrowLeft, Calendar, Clock, Share2 } from 'lucide-react';
import { format } from 'date-fns';
import { toast } from 'sonner';
import { ImageGallery } from '@/components/ImageGallery';


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

}


const BlogDetailPage = () => {

  const { slug } = useParams<{ slug: string }>();


  const { data: blog, isLoading, error } = useQuery({

    queryKey: ['blog', slug],

    queryFn: async () => {

      const { data, error } = await supabase
        .from('blogs')
        .select('*')
        .eq('slug', slug)
        .eq('status', 'published')
        .single();

      if (error) throw error;

      return data as unknown as Blog;

    },

    enabled: !!slug,

  });



  const handleShare = async () => {

    try {

      await navigator.clipboard.writeText(window.location.href);

      toast.success('Link copied to clipboard!');

    }
    catch {

      toast.error('Failed to copy link');

    }

  };



  if (isLoading) {

    return (

      <div className="min-h-screen bg-background">

        <Header />

        <div className="pt-32 pb-16 px-4">

          <div className="container mx-auto max-w-4xl">

            <Skeleton className="h-8 w-32 mb-8" />

            <Skeleton className="h-12 w-3/4 mb-4" />

            <Skeleton className="h-6 w-1/2 mb-8" />

            <Skeleton className="h-[400px] w-full rounded-xl mb-8" />

          </div>

        </div>

        <Footer />

      </div>

    );

  }



  if (error || !blog) {

    return (

      <div className="min-h-screen bg-background">

        <Header />

        <div className="pt-32 pb-16 px-4">

          <div className="container mx-auto max-w-4xl text-center">

            <h1 className="text-3xl font-bold text-foreground mb-4">

              Article Not Found

            </h1>

            <Link to="/blog">

              <Button>

                <ArrowLeft className="mr-2 h-4 w-4" />

                Back to Blog

              </Button>

            </Link>

          </div>

        </div>

        <Footer />

      </div>

    );

  }



  /* FINAL SEO VALUES */

  const seoTitle =
    blog.meta_title || blog.title;

  const seoDescription =
    blog.meta_description ||
    blog.excerpt ||
    "";

  const seoCanonical =
    blog.canonical_url ||
    `https://www.theunoia.com/blog/${blog.slug}`;



  return (

    <>

      {/* SEO TAGS */}

      <Helmet prioritizeSeoTags>

        <title>{seoTitle}</title>


        <meta
          name="description"
          content={seoDescription}
        />


        <meta property="og:title" content={seoTitle} />


        <meta
          property="og:description"
          content={seoDescription}
        />


        <meta
          property="og:url"
          content={seoCanonical}
        />


        <link
          rel="canonical"
          href={seoCanonical}
        />

      </Helmet>



      <div className="min-h-screen bg-background">

        <Header />


        <article className="pt-32 pb-16 px-4">


          <div className="container mx-auto max-w-4xl">


            <Link
              to="/blog"
              className="inline-flex items-center text-muted-foreground hover:text-foreground mb-8"
            >

              <ArrowLeft className="mr-2 h-4 w-4" />

              Back to Blog

            </Link>



            {/* ONLY ONE H1 FOR SEO */}

            <h1 className="text-3xl md:text-5xl font-bold mb-4">

              {blog.title}

            </h1>



            <div className="flex gap-4 mb-8 text-muted-foreground">


              <span className="flex items-center gap-1">

                <Calendar className="h-4 w-4" />

                {format(
                  new Date(
                    blog.published_at ||
                    blog.created_at
                  ),
                  'MMMM d, yyyy'
                )}

              </span>


              <span className="flex items-center gap-1">

                <Clock className="h-4 w-4" />

                5 min read

              </span>



              <Button
                variant="ghost"
                size="sm"
                onClick={handleShare}
              >

                <Share2 className="h-4 w-4 mr-1" />

                Share

              </Button>

            </div>



            {/* COVER IMAGE FIXED */}

            {blog.cover_image_url && (

              <div className="mb-10">

                <img
                  src={blog.cover_image_url}
                  alt={blog.title}
                  className="w-full h-auto max-h-[600px] object-contain rounded-xl"
                />

              </div>

            )}



            {/* GALLERY */}

            {blog.blog_images &&
              blog.blog_images.length > 1 && (

                <div className="mb-8">

                  <ImageGallery
                    images={
                      blog.blog_images.filter(
                        img =>
                          img !== blog.cover_image_url
                      )
                    }
                    coverImageUrl={
                      blog.cover_image_url
                    }
                  />

                </div>

              )}



            {/* EXCERPT */}

            {blog.excerpt && (

              <p className="text-xl mb-8 italic">

                {blog.excerpt}

              </p>

            )}



            {/* CONTENT */}

            <div
              className="prose prose-lg max-w-none dark:prose-invert"
              dangerouslySetInnerHTML={{
                __html: blog.content
              }}
            />


          </div>


        </article>



        <Footer />


      </div>


    </>

  );

};


export default BlogDetailPage;
