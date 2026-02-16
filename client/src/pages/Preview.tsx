import { useEffect, useState } from "react";
import { useRoute } from "wouter";
import { useOrder } from "@/hooks/use-orders";
import { Button } from "@/components/ui/button";
import { Loader2, Download, ExternalLink, Edit2, Share2 } from "lucide-react";
import confetti from "canvas-confetti";
import { 
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { useToast } from "@/hooks/use-toast";

// Templates components
import { TemplateSageGreen } from "@/components/templates/TemplateSageGreen";
import { TemplateOldMoney } from "@/components/templates/TemplateOldMoney";
import { TemplateMinimalist } from "@/components/templates/TemplateMinimalist";
import { TemplateLuxuryGold } from "@/components/templates/TemplateLuxuryGold";
import { TemplateBotanical } from "@/components/templates/TemplateBotanical";

export default function Preview() {
  const [match, params] = useRoute("/preview/:id");
  const id = params ? parseInt(params.id) : undefined;
  const { data: order, isLoading } = useOrder(id);
  const { toast } = useToast();
  const [isPublishOpen, setIsPublishOpen] = useState(false);

  useEffect(() => {
    if (order?.status === "completed") {
      confetti({
        particleCount: 100,
        spread: 70,
        origin: { y: 0.6 },
        colors: ['#D4C4B5', '#4A4A4A', '#F3EFE9']
      });
    }
  }, [order?.status]);

  if (isLoading || !order) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-background">
        <Loader2 className="w-12 h-12 animate-spin text-primary" />
      </div>
    );
  }

  const renderTemplate = () => {
    const props = {
      details: order.weddingDetails,
      content: order.generatedContent,
    };

    switch (order.template) {
      case "sage_green": return <TemplateSageGreen {...props} />;
      case "old_money": return <TemplateOldMoney {...props} />;
      case "minimalist": return <TemplateMinimalist {...props} />;
      case "luxury_gold": return <TemplateLuxuryGold {...props} />;
      case "botanical": return <TemplateBotanical {...props} />;
      default: return <TemplateMinimalist {...props} />;
    }
  };

  const handleDownload = () => {
    window.location.href = `/api/orders/${id}/download`;
    toast({
      title: "Downloading...",
      description: "Your website files are being prepared.",
    });
  };

  return (
    <div className="min-h-screen bg-gray-100 flex flex-col">
      {/* Editor Toolbar */}
      <div className="bg-white border-b border-gray-200 px-4 py-3 flex items-center justify-between sticky top-0 z-50 shadow-sm">
        <div className="flex items-center space-x-4">
          <div className="font-semibold text-gray-900">Preview Mode</div>
          <div className="hidden md:flex text-sm text-gray-500 items-center space-x-2">
            <span className="w-2 h-2 rounded-full bg-green-500"></span>
            <span>Changes saved</span>
          </div>
        </div>

        <div className="flex items-center space-x-3">
          <Button variant="outline" size="sm" onClick={() => window.location.href = `/dashboard/${id}`}>
            <Edit2 className="w-4 h-4 mr-2" />
            Edit Details
          </Button>
          
          <Dialog open={isPublishOpen} onOpenChange={setIsPublishOpen}>
            <DialogTrigger asChild>
              <Button size="sm" className="bg-primary text-primary-foreground hover:bg-primary/90">
                <Share2 className="w-4 h-4 mr-2" />
                Publish & Export
              </Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-md">
              <DialogHeader>
                <DialogTitle>Share Your Wedding Website</DialogTitle>
                <DialogDescription>
                  Your website is ready to share with guests. Choose how you'd like to publish it.
                </DialogDescription>
              </DialogHeader>
              <div className="space-y-6 pt-4">
                <div className="space-y-2">
                  <h4 className="text-sm font-medium">Live Preview Link</h4>
                  <div className="flex space-x-2">
                    <Input readOnly value={`${window.location.origin}/site/${order.accessCode}`} />
                    <Button variant="outline" size="icon" onClick={() => {
                      navigator.clipboard.writeText(`${window.location.origin}/site/${order.accessCode}`);
                      toast({ title: "Copied!", description: "Link copied to clipboard." });
                    }}>
                      <ExternalLink className="w-4 h-4" />
                    </Button>
                  </div>
                </div>

                <div className="space-y-2">
                  <h4 className="text-sm font-medium">Download Source Code</h4>
                  <p className="text-xs text-muted-foreground">Get a ZIP file with all HTML/CSS/Images to host anywhere (GitHub Pages, Netlify, etc).</p>
                  <Button onClick={handleDownload} className="w-full">
                    <Download className="w-4 h-4 mr-2" />
                    Download .ZIP
                  </Button>
                </div>

                <div className="bg-muted p-4 rounded-lg text-sm text-muted-foreground">
                  <strong>Want a custom domain?</strong> (e.g. sarahandjames.com)
                  <br />
                  <a href="#" className="underline text-primary">Contact support</a> to upgrade your package.
                </div>
              </div>
            </DialogContent>
          </Dialog>
        </div>
      </div>

      {/* Website Preview Iframe/Container */}
      <div className="flex-1 overflow-auto bg-gray-100 p-4 md:p-8 flex justify-center">
        <div className="w-full max-w-[1440px] bg-white shadow-2xl overflow-hidden rounded-md min-h-[800px]">
          {renderTemplate()}
        </div>
      </div>
    </div>
  );
}
