"use client";

import { useLanguage } from "@/lib/i18n/context";
import { motion, useReducedMotion } from "framer-motion";
import { Car, Clock, ExternalLink } from "lucide-react";

export function Location() {
  const { language } = useLanguage();
  const shouldReduceMotion = useReducedMotion();

  // Google Maps embed URL for 15 Rivette St, Scoresby, VIC 3179
  const mapEmbedUrl =
    "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3148.8876!2d145.2283!3d-37.8847!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x6ad63e3d3c8f3a3f%3A0x1234567890abcdef!2s15%20Rivette%20St%2C%20Scoresby%20VIC%203179!5e0!3m2!1sen!2sau!4v1234567890";

  const googleMapsLink =
    "https://www.google.com/maps/search/?api=1&query=15+Rivette+St,+Scoresby,+VIC+3179,+Australia";

  return (
    <section id="location" className="py-12 sm:py-16 md:py-24 bg-background">
      <div className="container mx-auto px-5 sm:px-8">
        {/* Section Header */}
        <motion.div
          className="text-center mb-6 sm:mb-8 md:mb-12"
          initial={shouldReduceMotion ? {} : { opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          viewport={{ once: true }}
        >
          <h2
            className={`font-serif text-2xl sm:text-3xl md:text-4xl font-bold text-foreground mb-3 sm:mb-4 ${
              language === "zh" ? "font-serif-cn" : ""
            }`}
          >
            {language === "zh" ? "校区位置" : "The Campus"}
          </h2>
          <p className="text-muted-foreground text-base sm:text-lg max-w-2xl mx-auto">
            {language === "zh"
              ? "专注学习的理想环境"
              : "A dedicated learning environment free from distraction"}
          </p>
        </motion.div>

        {/* Map Card */}
        <motion.div
          className="max-w-4xl mx-auto"
          initial={shouldReduceMotion ? {} : { opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          viewport={{ once: true }}
        >
          <div className="card-prestige overflow-hidden bg-white">
            {/* Mobile: Stacked layout */}
            <div className="flex flex-col md:grid md:grid-cols-2">
              {/* Map Side - Embedded Google Map */}
              <div className="relative aspect-[4/3] md:aspect-auto md:min-h-[400px] bg-muted">
                <iframe
                  src={mapEmbedUrl}
                  className="absolute inset-0 w-full h-full border-0"
                  allowFullScreen
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                  title={
                    language === "zh"
                      ? "曲博士教育位置地图"
                      : "Dr Ricky's Education Location Map"
                  }
                />

                {/* Mobile: Tap to open in Maps app overlay */}
                <a
                  href={googleMapsLink}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="md:hidden absolute bottom-3 left-3 right-3 flex items-center justify-center gap-2 bg-white/95 backdrop-blur-sm py-2.5 px-4 rounded-lg shadow-md text-sm font-medium text-primary touch-target"
                >
                  <ExternalLink className="w-4 h-4" />
                  {language === "zh" ? "在地图应用中打开" : "Open in Maps"}
                </a>
              </div>

              {/* Info Side */}
              <div className="p-5 sm:p-6 md:p-8 flex flex-col justify-center">
                {/* Address */}
                <div className="mb-5 sm:mb-6">
                  <h3
                    className={`font-serif text-lg sm:text-xl font-bold text-foreground mb-1.5 sm:mb-2 ${
                      language === "zh" ? "font-serif-cn" : ""
                    }`}
                  >
                    Dr Ricky&apos;s Education
                  </h3>
                  <p className="text-muted-foreground text-sm sm:text-base">
                    15 Rivette St, Scoresby
                    <br />
                    VIC 3179, Australia
                  </p>
                </div>

                {/* Transport Info */}
                <div className="space-y-3 sm:space-y-4">
                  <div className="flex items-start gap-3">
                    <div className="w-9 h-9 sm:w-10 sm:h-10 rounded-lg bg-primary/10 flex items-center justify-center shrink-0">
                      <Car className="w-4 h-4 sm:w-5 sm:h-5 text-primary" />
                    </div>
                    <div>
                      <h4 className="font-medium text-foreground text-sm sm:text-base">
                        {language === "zh" ? "驾车" : "By Car"}
                      </h4>
                      <p className="text-xs sm:text-sm text-muted-foreground">
                        {language === "zh"
                          ? "距离Eastlink 5分钟车程，充足停车位"
                          : "5 mins from Eastlink, ample parking"}
                      </p>
                    </div>
                  </div>

                  <div className="flex items-start gap-3">
                    <div className="w-9 h-9 sm:w-10 sm:h-10 rounded-lg bg-accent/10 flex items-center justify-center shrink-0">
                      <Clock className="w-4 h-4 sm:w-5 sm:h-5 text-accent" />
                    </div>
                    <div>
                      <h4 className="font-medium text-foreground text-sm sm:text-base">
                        {language === "zh" ? "服务区域" : "Service Area"}
                      </h4>
                      <p className="text-xs sm:text-sm text-muted-foreground">
                        Glen Waverley, Wheelers Hill, Wantirna, Caulfield
                      </p>
                    </div>
                  </div>
                </div>

                {/* CTA - Hidden on mobile since we have the overlay button */}
                <a
                  href={googleMapsLink}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hidden md:inline-flex btn-outline mt-8 w-auto text-center items-center gap-2"
                >
                  <ExternalLink className="w-4 h-4" />
                  {language === "zh" ? "在地图中查看" : "View on Google Maps"}
                </a>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
