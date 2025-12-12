"use client";

import { useLanguage } from "@/lib/i18n/context";
import { Phone, Mail, MessageCircle, AlertCircle, Send } from "lucide-react";
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
    <section id="contact" className="section-botanical bg-background">
      <div className="container mx-auto px-4 max-w-7xl">
        {/* Section Header */}
        <SectionHeader className="text-center mb-16">
          <div className="flex items-center justify-center gap-3 mb-6">
            <div className="h-px w-16 bg-border" />
            <Send className="h-5 w-5 text-accent/60" strokeWidth={1.5} />
            <div className="h-px w-16 bg-border" />
          </div>
          <SectionTitle className="font-serif text-4xl md:text-5xl lg:text-6xl font-semibold text-foreground mb-4 text-balance">
            {t.contact.title}
          </SectionTitle>
          <SectionSubtitle className="text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto">
            {t.contact.subtitle}
          </SectionSubtitle>
        </SectionHeader>

        <div className="max-w-4xl mx-auto">
          {/* Notice Banner */}
          <ScaleIn>
            <div className="card-botanical p-6 mb-10 border border-accent/30 bg-accent/5">
              <div className="flex items-start gap-4">
                <div className="w-10 h-10 rounded-full bg-accent/10 flex items-center justify-center shrink-0">
                  <AlertCircle className="h-5 w-5 text-accent" strokeWidth={1.5} />
                </div>
                <div>
                  <p className="font-serif text-lg font-semibold text-foreground">{t.contact.limitedSpots}</p>
                  <p className="text-muted-foreground mt-1">
                    {t.contact.adminNote}
                  </p>
                </div>
              </div>
            </div>
          </ScaleIn>

          <div className="grid md:grid-cols-2 gap-8">
            {/* Contact Info */}
            <Stagger className="space-y-4">
              {/* Phone */}
              <StaggerItem>
                <CardHover>
                  <a
                    href={`tel:${PHONE_NUMBER.replace(/\s/g, "")}`}
                    className="card-botanical p-6 flex items-center gap-4 group"
                  >
                    <div className="w-14 h-14 rounded-full bg-primary/10 flex items-center justify-center shrink-0 transition-colors duration-300 group-hover:bg-primary/20">
                      <Phone className="h-6 w-6 text-primary" strokeWidth={1.5} />
                    </div>
                    <div>
                      <p className="text-sm text-muted-foreground mb-1">{t.contact.phone}</p>
                      <p className="font-serif text-lg font-semibold text-foreground group-hover:text-primary transition-colors duration-300">
                        {PHONE_NUMBER}
                      </p>
                    </div>
                  </a>
                </CardHover>
              </StaggerItem>

              {/* Email */}
              <StaggerItem>
                <CardHover>
                  <a
                    href={`mailto:${EMAIL}`}
                    className="card-botanical p-6 flex items-center gap-4 group"
                  >
                    <div className="w-14 h-14 rounded-full bg-primary/10 flex items-center justify-center shrink-0 transition-colors duration-300 group-hover:bg-primary/20">
                      <Mail className="h-6 w-6 text-primary" strokeWidth={1.5} />
                    </div>
                    <div>
                      <p className="text-sm text-muted-foreground mb-1">{t.contact.email}</p>
                      <p className="font-serif text-lg font-semibold text-foreground group-hover:text-primary transition-colors duration-300">
                        {EMAIL}
                      </p>
                    </div>
                  </a>
                </CardHover>
              </StaggerItem>
            </Stagger>

            {/* WeChat QR Codes */}
            <FadeInRight>
              <div className="card-botanical h-full p-8">
                <div className="flex items-center gap-3 mb-2">
                  <div className="w-10 h-10 rounded-full bg-[#07C160]/10 flex items-center justify-center">
                    <MessageCircle className="h-5 w-5 text-[#07C160]" strokeWidth={1.5} />
                  </div>
                  <h3 className="font-serif text-xl font-semibold text-foreground">
                    {t.contact.wechat}
                  </h3>
                </div>
                <p className="text-sm text-muted-foreground mb-6 pl-13">{t.contact.scanQR}</p>

                <div className="grid grid-cols-2 gap-4">
                  {/* QR Code Placeholder 1 */}
                  <div className="aspect-square bg-muted rounded-2xl flex items-center justify-center border border-border">
                    <div className="text-center text-muted-foreground p-4">
                      <MessageCircle className="h-10 w-10 mx-auto mb-2 text-[#07C160]/60" strokeWidth={1} />
                      <p className="text-xs font-medium">
                        {language === "zh" ? "微信二维码 1" : "WeChat QR 1"}
                      </p>
                    </div>
                  </div>

                  {/* QR Code Placeholder 2 */}
                  <div className="aspect-square bg-muted rounded-2xl flex items-center justify-center border border-border">
                    <div className="text-center text-muted-foreground p-4">
                      <MessageCircle className="h-10 w-10 mx-auto mb-2 text-[#07C160]/60" strokeWidth={1} />
                      <p className="text-xs font-medium">
                        {language === "zh" ? "微信二维码 2" : "WeChat QR 2"}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </FadeInRight>
          </div>
        </div>
      </div>
    </section>
  );
}
