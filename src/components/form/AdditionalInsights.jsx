import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Info } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

export const AdditionalInsights = ({ formData, handleInputChange }) => {
  const { toast } = useToast();
  
  return (
    <Card className="shadow-lg border-0"> 
      <CardHeader className="bg-gradient-to-r from-gray-600 to-gray-700 text-white"> 
        <CardTitle className="flex items-center gap-2"> 
          <Info className="w-5 h-5" /> 
          Additional Insights 
        </CardTitle> 
      </CardHeader> 
      <CardContent className="p-6"> 
        <div className="space-y-4"> 
          <div className="space-y-2"> 
            <Label className="text-lg font-semibold text-gray-800"> 
              Any other insights from discussion 
            </Label> 
            <p className="text-sm text-gray-600 italic"> 
              Please share any additional insights, observations, or 
              important information gathered during the discussion that 
              may not have been captured in the previous sections. 
            </p> 
          </div> 

          <div className="relative"> 
            <textarea 
              className="w-full min-h-[200px] p-4 border border-gray-300 rounded-lg resize-none focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all duration-200 bg-white" 
              placeholder="Enter any additional insights, observations, or important information from your discussion with the physician..." 
              value={formData.additionalInsights || ""} 
              onChange={(e) => 
                handleInputChange("additionalInsights", e.target.value) 
              } 
              style={{ 
                minHeight: "200px", 
                maxHeight: "400px", 
              }} 
            /> 

            {/* Character counter */} 
            <div className="flex justify-end mt-2 text-xs text-gray-500"> 
              <span> 
                {formData.additionalInsights?.length || 0} characters 
              </span> 
            </div> 

            {/* Interactive features */} 
            <div className="mt-4 flex flex-wrap gap-2"> 
              <Button 
                type="button" 
                variant="outline" 
                size="sm" 
                onClick={() => { 
                  const insights = formData.additionalInsights || ""; 
                  if (insights.length > 0) { 
                    navigator.clipboard.writeText(insights); 
                    toast({ 
                      title: "Success",
                      description: "Additional insights copied to clipboard!",
                      variant: "success"
                    }); 
                  } 
                }} 
                className="text-xs cursor-pointer" 
              > 
                Copy to Clipboard 
              </Button> 
              <Button 
                type="button" 
                variant="outline" 
                size="sm" 
                onClick={() => 
                  handleInputChange("additionalInsights", "") 
                } 
                className="text-xs text-red-600 hover:text-red-700 cursor-pointer" 
              > 
                Clear Text 
              </Button> 
            </div> 
          </div> 
        </div> 
      </CardContent> 
    </Card>
  );
};