"use client";

import { useState } from "react";
import { useLanguage } from "@/lib/i18n/context";
import { motion, useReducedMotion } from "framer-motion";
import { QrCode, Mail, Phone, Send } from "lucide-react";

export function Contact() {
  const { language } = useLanguage();
  const shouldReduceMotion = useReducedMotion();
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    message: "",
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Placeholder for form submission
    console.log("Form submitted:", formData);
    alert(
      language === "zh"
        ? "感谢您的留言！我们会尽快与您联系。"
        : "Thank you for your message! We will contact you soon."
    );
  };

  return (
    <section id="contact" className="py-12 sm:py-16 md:py-24 bg-muted/30">
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
            className={`font-serif text-xl sm:text-2xl md:text-3xl lg:text-4xl font-bold text-foreground mb-3 sm:mb-4 ${
              language === "zh" ? "font-serif-cn" : ""
            }`}
          >
            {language === "zh"
              ? "准备好升级孩子的学习引擎了吗？"
              : "Ready to upgrade your child's learning engine?"}
          </h2>
        </motion.div>

        {/* Split Card */}
        <motion.div
          className="max-w-4xl mx-auto"
          initial={shouldReduceMotion ? {} : { opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          viewport={{ once: true }}
        >
          <div className="card-prestige overflow-hidden bg-white">
            <div className="flex flex-col md:grid md:grid-cols-2">
              {/* Left Side - WeChat QR (Primary) */}
              <div className="bg-primary p-6 sm:p-8 md:p-12 flex flex-col items-center justify-center text-center">
                <h3
                  className={`font-serif text-lg sm:text-xl font-bold text-white mb-1.5 sm:mb-2 ${
                    language === "zh" ? "font-serif-cn" : ""
                  }`}
                >
                  {language === "zh" ? "微信联系" : "Chat via WeChat"}
                </h3>
                <p className="text-white/80 text-xs sm:text-sm mb-4 sm:mb-6">
                  {language === "zh"
                    ? "直接与曲博士团队对话"
                    : "Chat directly with Dr. Ricky's Team"}
                </p>

                {/* QR Code Placeholder - Smaller on mobile */}
                <div className="w-36 h-36 sm:w-44 sm:h-44 md:w-48 md:h-48 bg-white rounded-xl flex items-center justify-center mb-3 sm:mb-4 shadow-lg">
                  <div className="text-center">
                    <QrCode className="w-16 h-16 sm:w-20 sm:h-20 md:w-24 md:h-24 text-primary/20 mx-auto" />
                    <p className="text-[10px] sm:text-xs text-muted-foreground mt-1.5 sm:mt-2">
                      {language === "zh" ? "二维码占位符" : "QR placeholder"}
                    </p>
                  </div>
                </div>

                <p className="text-white/60 text-[10px] sm:text-xs">
                  {language === "zh"
                    ? "扫描二维码添加微信"
                    : "Scan QR code to add WeChat"}
                </p>
              </div>

              {/* Right Side - Contact Form */}
              <div className="p-5 sm:p-6 md:p-8 lg:p-12">
                <h3
                  className={`font-serif text-lg sm:text-xl font-bold text-foreground mb-4 sm:mb-6 ${
                    language === "zh" ? "font-serif-cn" : ""
                  }`}
                >
                  {language === "zh" ? "或者发送消息" : "Or send a message"}
                </h3>

                <form onSubmit={handleSubmit} className="space-y-3 sm:space-y-4">
                  {/* Name */}
                  <div>
                    <label
                      htmlFor="name"
                      className="block text-xs sm:text-sm font-medium text-foreground mb-1"
                    >
                      {language === "zh" ? "姓名" : "Name"}
                    </label>
                    <input
                      type="text"
                      id="name"
                      value={formData.name}
                      onChange={(e) =>
                        setFormData({ ...formData, name: e.target.value })
                      }
                      className="w-full px-3 sm:px-4 py-2.5 sm:py-2 rounded-lg border border-border bg-background focus:outline-none focus:ring-2 focus:ring-primary/50 text-sm sm:text-base"
                      placeholder={
                        language === "zh" ? "您的姓名" : "Your name"
                      }
                    />
                  </div>

                  {/* Email */}
                  <div>
                    <label
                      htmlFor="email"
                      className="block text-xs sm:text-sm font-medium text-foreground mb-1"
                    >
                      {language === "zh" ? "邮箱" : "Email"}
                    </label>
                    <div className="relative">
                      <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                      <input
                        type="email"
                        id="email"
                        value={formData.email}
                        onChange={(e) =>
                          setFormData({ ...formData, email: e.target.value })
                        }
                        className="w-full pl-10 pr-3 sm:pr-4 py-2.5 sm:py-2 rounded-lg border border-border bg-background focus:outline-none focus:ring-2 focus:ring-primary/50 text-sm sm:text-base"
                        placeholder="email@example.com"
                      />
                    </div>
                  </div>

                  {/* Phone */}
                  <div>
                    <label
                      htmlFor="phone"
                      className="block text-xs sm:text-sm font-medium text-foreground mb-1"
                    >
                      {language === "zh" ? "电话" : "Phone"}
                    </label>
                    <div className="relative">
                      <Phone className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                      <input
                        type="tel"
                        id="phone"
                        value={formData.phone}
                        onChange={(e) =>
                          setFormData({ ...formData, phone: e.target.value })
                        }
                        className="w-full pl-10 pr-3 sm:pr-4 py-2.5 sm:py-2 rounded-lg border border-border bg-background focus:outline-none focus:ring-2 focus:ring-primary/50 text-sm sm:text-base"
                        placeholder={
                          language === "zh" ? "您的电话号码" : "Your phone number"
                        }
                      />
                    </div>
                  </div>

                  {/* Message */}
                  <div>
                    <label
                      htmlFor="message"
                      className="block text-xs sm:text-sm font-medium text-foreground mb-1"
                    >
                      {language === "zh" ? "留言" : "Message"}{" "}
                      <span className="text-muted-foreground">
                        ({language === "zh" ? "可选" : "optional"})
                      </span>
                    </label>
                    <textarea
                      id="message"
                      value={formData.message}
                      onChange={(e) =>
                        setFormData({ ...formData, message: e.target.value })
                      }
                      rows={3}
                      className="w-full px-3 sm:px-4 py-2.5 sm:py-2 rounded-lg border border-border bg-background focus:outline-none focus:ring-2 focus:ring-primary/50 resize-none text-sm sm:text-base"
                      placeholder={
                        language === "zh"
                          ? "请告诉我们您孩子的年级和需求"
                          : "Tell us about your child's grade level and needs"
                      }
                    />
                  </div>

                  {/* Submit Button */}
                  <button type="submit" className="btn-gold w-full touch-target">
                    <Send className="w-4 h-4" />
                    {language === "zh" ? "发送消息" : "Send Message"}
                  </button>
                </form>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
