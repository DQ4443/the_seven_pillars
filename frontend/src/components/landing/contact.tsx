"use client";

import { useLanguage } from "@/lib/i18n/context";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Phone, Mail, MessageCircle, AlertCircle } from "lucide-react";
import {
  SectionHeader,
  SectionTitle,
  SectionSubtitle,
  FadeInUp,
  FadeInLeft,
  FadeInRight,
  ScaleIn,
  Stagger,
  StaggerItem,
  CardHover,
} from "./animations";

const PHONE_NUMBER = "+61 415 435 987";
const EMAIL = "qu.ricky@gmail.com";

export function Contact() {
  const { language, t } = useLanguage();

  return (
    <section id="contact" className="py-16 md:py-24 bg-background">
      <div className="container mx-auto px-4">
        {/* Section Header */}
        <SectionHeader className="text-center mb-12">
          <SectionTitle className="text-3xl md:text-4xl font-bold text-primary mb-4">
            {t.contact.title}
          </SectionTitle>
          <SectionSubtitle className="text-lg text-muted-foreground max-w-2xl mx-auto">
            {t.contact.subtitle}
          </SectionSubtitle>
        </SectionHeader>

        <div className="max-w-4xl mx-auto">
          {/* Notice Banner */}
          <ScaleIn>
            <Card className="mb-8 border-secondary bg-secondary/5">
              <CardContent className="p-4 flex items-start space-x-3">
                <AlertCircle className="h-5 w-5 text-secondary shrink-0 mt-0.5" />
                <div>
                  <p className="font-medium text-foreground">{t.contact.limitedSpots}</p>
                  <p className="text-sm text-muted-foreground mt-1">
                    {t.contact.adminNote}
                  </p>
                </div>
              </CardContent>
            </Card>
          </ScaleIn>

          <div className="grid md:grid-cols-2 gap-6">
            {/* Contact Info */}
            <Stagger className="space-y-4">
              {/* Phone */}
              <StaggerItem>
                <CardHover>
                  <Card>
                    <CardContent className="p-4 flex items-center space-x-4">
                      <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center shrink-0">
                        <Phone className="h-5 w-5 text-primary" />
                      </div>
                      <div>
                        <p className="text-sm text-muted-foreground">{t.contact.phone}</p>
                        <a
                          href={`tel:${PHONE_NUMBER.replace(/\s/g, "")}`}
                          className="font-medium text-foreground hover:text-primary transition-colors"
                        >
                          {PHONE_NUMBER}
                        </a>
                      </div>
                    </CardContent>
                  </Card>
                </CardHover>
              </StaggerItem>

              {/* Email */}
              <StaggerItem>
                <CardHover>
                  <Card>
                    <CardContent className="p-4 flex items-center space-x-4">
                      <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center shrink-0">
                        <Mail className="h-5 w-5 text-primary" />
                      </div>
                      <div>
                        <p className="text-sm text-muted-foreground">{t.contact.email}</p>
                        <a
                          href={`mailto:${EMAIL}`}
                          className="font-medium text-foreground hover:text-primary transition-colors"
                        >
                          {EMAIL}
                        </a>
                      </div>
                    </CardContent>
                  </Card>
                </CardHover>
              </StaggerItem>
            </Stagger>

            {/* WeChat QR Codes */}
            <FadeInRight>
              <Card className="h-full">
                <CardHeader className="pb-2">
                  <CardTitle className="text-lg flex items-center space-x-2">
                    <MessageCircle className="h-5 w-5 text-[#07C160]" />
                    <span>{t.contact.wechat}</span>
                  </CardTitle>
                  <p className="text-sm text-muted-foreground">{t.contact.scanQR}</p>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-2 gap-4">
                    {/* QR Code Placeholder 1 */}
                    <div className="aspect-square bg-muted rounded-lg flex items-center justify-center border-2 border-dashed border-border">
                      <div className="text-center text-muted-foreground p-2">
                        <MessageCircle className="h-8 w-8 mx-auto mb-2 text-[#07C160]" />
                        <p className="text-xs">
                          {language === "zh" ? "微信二维码 1" : "WeChat QR 1"}
                        </p>
                      </div>
                    </div>

                    {/* QR Code Placeholder 2 */}
                    <div className="aspect-square bg-muted rounded-lg flex items-center justify-center border-2 border-dashed border-border">
                      <div className="text-center text-muted-foreground p-2">
                        <MessageCircle className="h-8 w-8 mx-auto mb-2 text-[#07C160]" />
                        <p className="text-xs">
                          {language === "zh" ? "微信二维码 2" : "WeChat QR 2"}
                        </p>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </FadeInRight>
          </div>
        </div>
      </div>
    </section>
  );
}
