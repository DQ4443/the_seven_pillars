'use client'

import { useState } from 'react'
import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'

// Placeholder FAQ data - in production, this would come from the database
const faqData = [
  {
    id: 1,
    category: 'General',
    question_en: 'What subjects do you offer?',
    answer_en: 'We offer tutoring in Mathematics, English, and Science for students from Year 1 to Year 12, all aligned with the Australian curriculum.',
    question_zh: '你们提供哪些科目的辅导？',
    answer_zh: '我们为1年级到12年级的学生提供数学、英语和科学的辅导课程，所有课程都与澳大利亚课程标准相匹配。',
  },
  {
    id: 2,
    category: 'Classes',
    question_en: 'What is the class size?',
    answer_en: 'We maintain small class sizes with a maximum of 20 students per class to ensure personalized attention for each student.',
    question_zh: '班级人数是多少？',
    answer_zh: '我们保持小班教学，每班最多20名学生，以确保每位学生都能得到个性化的关注。',
  },
  {
    id: 3,
    category: 'Classes',
    question_en: 'How are classes conducted?',
    answer_en: 'Classes are conducted online via Google Meet. Students can join from anywhere with a stable internet connection.',
    question_zh: '课程是如何进行的？',
    answer_zh: '课程通过Google Meet在线进行。学生可以在任何有稳定网络连接的地方参加课程。',
  },
  {
    id: 4,
    category: 'Enrollment',
    question_en: 'How do I enroll my child?',
    answer_en: 'You can register on our website and have your child take our entrance test. Based on the results, we will recommend suitable classes for your child.',
    question_zh: '我如何为孩子报名？',
    answer_zh: '您可以在我们的网站上注册，并让您的孩子参加我们的入学测试。根据测试结果，我们将为您的孩子推荐合适的课程。',
  },
  {
    id: 5,
    category: 'Enrollment',
    question_en: 'Is there a trial class available?',
    answer_en: 'Yes, we offer a free trial class for new students. Please contact us to schedule a trial.',
    question_zh: '有试听课吗？',
    answer_zh: '有的，我们为新学生提供免费试听课。请联系我们预约试听。',
  },
  {
    id: 6,
    category: 'Payment',
    question_en: 'What are the payment options?',
    answer_en: 'We accept credit cards, bank transfers, and PayPal. Payment can be made monthly or per term.',
    question_zh: '有哪些付款方式？',
    answer_zh: '我们接受信用卡、银行转账和PayPal。您可以选择按月或按学期付款。',
  },
]

export default function FAQPage() {
  const [language, setLanguage] = useState<'en' | 'zh'>('en')
  const [activeCategory, setActiveCategory] = useState<string | null>(null)

  const categories = [...new Set(faqData.map((faq) => faq.category))]

  const filteredFAQs = activeCategory
    ? faqData.filter((faq) => faq.category === activeCategory)
    : faqData

  return (
    <div className="min-h-screen">
      {/* Navigation */}
      <header className="border-b">
        <nav className="container mx-auto px-4 py-4 flex items-center justify-between">
          <Link href="/" className="text-xl font-bold">
            The Seven Pillars
          </Link>
          <div className="flex items-center gap-4">
            <Link href="/timetable" className="text-sm hover:underline">
              Timetable
            </Link>
            <Link href="/faq" className="text-sm font-medium">
              FAQ
            </Link>
            <Link href="/login">
              <Button variant="outline" size="sm">Sign In</Button>
            </Link>
          </div>
        </nav>
      </header>

      {/* Main Content */}
      <main className="container mx-auto px-4 py-12">
        <div className="max-w-4xl mx-auto">
          <div className="flex justify-between items-center mb-8">
            <h1 className="text-3xl font-bold">
              {language === 'en' ? 'Frequently Asked Questions' : '常见问题'}
            </h1>
            <div className="flex gap-2">
              <Button
                variant={language === 'en' ? 'default' : 'outline'}
                size="sm"
                onClick={() => setLanguage('en')}
              >
                English
              </Button>
              <Button
                variant={language === 'zh' ? 'default' : 'outline'}
                size="sm"
                onClick={() => setLanguage('zh')}
              >
                中文
              </Button>
            </div>
          </div>

          {/* Category Filter */}
          <div className="flex gap-2 mb-8 flex-wrap">
            <Button
              variant={activeCategory === null ? 'default' : 'outline'}
              size="sm"
              onClick={() => setActiveCategory(null)}
            >
              {language === 'en' ? 'All' : '全部'}
            </Button>
            {categories.map((category) => (
              <Button
                key={category}
                variant={activeCategory === category ? 'default' : 'outline'}
                size="sm"
                onClick={() => setActiveCategory(category)}
              >
                {category}
              </Button>
            ))}
          </div>

          {/* FAQ List */}
          <div className="space-y-4">
            {filteredFAQs.map((faq) => (
              <Card key={faq.id}>
                <CardHeader>
                  <CardTitle className="text-lg">
                    {language === 'en' ? faq.question_en : faq.question_zh}
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground">
                    {language === 'en' ? faq.answer_en : faq.answer_zh}
                  </p>
                </CardContent>
              </Card>
            ))}
          </div>

          {/* Contact CTA */}
          <div className="mt-12 p-8 bg-muted rounded-lg text-center">
            <h2 className="text-xl font-semibold mb-2">
              {language === 'en' ? "Can't find what you're looking for?" : '找不到您需要的答案？'}
            </h2>
            <p className="text-muted-foreground mb-4">
              {language === 'en'
                ? 'Contact us and we\'ll be happy to help.'
                : '联系我们，我们很乐意为您解答。'}
            </p>
            <Link href="/contact">
              <Button>
                {language === 'en' ? 'Contact Us' : '联系我们'}
              </Button>
            </Link>
          </div>
        </div>
      </main>
    </div>
  )
}
