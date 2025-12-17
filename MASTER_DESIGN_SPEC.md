# MASTER DESIGN SPECIFICATION: Dr. Ricky's Education

**Version:** 1.0
**Target Device:** Mobile First (Responsive to Desktop)
**Vibe:** "Private Medical Practice meets Ivy League."

---

## I. The Design System (Global Styles)

### 1. Color Palette

| Role | Color | Hex | Usage |
|------|-------|-----|-------|
| Primary (Authority) | Oxford Blue | `#0E2A47` | Headers, Footer, Primary Buttons |
| Secondary (Prestige) | Muted Gold | `#C5A059` | Borders, highlights, "Book Assessment" button |
| Background | Warm Alabaster | `#F9F9F7` | The canvas |
| Text | Charcoal | `#333333` | Never pure black |

### 2. Typography

| Type | Font | Notes |
|------|------|-------|
| English Headings | Merriweather | Bold/Regular |
| Chinese Headings | Noto Serif SC | Bold |
| Body Copy | Inter or Lato | Line-height: 1.6 for EN, 1.8 for CN |

### 3. Global UI Elements

#### Mobile Sticky Conversion Bar
- **Position:** Fixed Bottom, Z-Index 999

| Button | Width | Color | Icon/Label | Interaction |
|--------|-------|-------|------------|-------------|
| Left | 40% | Blue | [WeChat] WeChat / 微信 | On tap → Copies ID to clipboard → Toast popup: "ID Copied!" |
| Right | 60% | Gold | Book Diagnostic / 预约诊断 | Smooth scroll to Admissions section |

#### Header
- **Logo:** Text-based Serif: "Dr. Ricky's Education"
- **Toggle:** Simple text link `EN | 中文`

---

## II. Page 1: HOME (The Hook)

### Section A: Hero (Full Viewport Height)

**Visual:** High-res photo of Dr. Ricky teaching (warm lighting), dark gradient overlay at bottom for text readability.

**Headline Component:**
- **CN:** 科学家带出来的孩子，逻辑才是一切。
- **EN:** Scientist-Led Education. Logic is Everything.

**Sub-Headline:**
- **CN:** 从协和医科大学博士到您孩子的私房导师。用科学家的严谨逻辑，对中小学课程进行"降维打击"。
- **EN:** From top-tier medical research to your child's classroom. I don't just teach the curriculum—I teach the scientific method of thinking that crushes the VCE.

**CTA Button (Desktop Only - Mobile uses Sticky Bar):**
- **Label:** 预约学业诊断 (Book Diagnostic)

### Section B: The "Pain Point" Selector (Interactive Grid)

**Layout:** 2x2 Grid of cards with Icons
**UX:** Tap card → Expands drawer with solution

| Card | Label | Reveal Text |
|------|-------|-------------|
| 1 | Shy in Class? / 孩子不敢提问？ | "I cold-call with kindness. No one hides in a class of 10." |
| 2 | Hates Math? / 讨厌数学？ | "They don't hate math; they hate being confused. Logic fixes that." |
| 3 | Scores Plateaued? / 成绩瓶颈期？ | "We stop memorizing and start understanding first principles." |

---

## III. Page 2: ABOUT (The Authority)

### Section A: The Narrative

**Headline:**
- **CN:** "Over-Qualified" ? 不，这是对教育的降维打击
- **EN:** The Scientist in the Classroom

**Body Text:**
- **CN:** 我曾是协和医科大学和清华大学的博士... 许多家长问我，为什么如此"高学历"却选择教书？因为我发现，塑造一个孩子的思维逻辑，比科研更具挑战性。
- **EN:** Why does a medical researcher teach Year 8 Science? Because shaping a young mind is more complex—and more rewarding—than developing a new drug.

### Section B: The Credential Stack (Vertical Timeline)

**Design:** A vertical line connecting 4 distinct nodes.

| Node | Credential |
|------|------------|
| 1 | PhD, Peking Union Medical College & Tsinghua University (中国协和医科大学 & 清华大学医学博士) |
| 2 | Post-Doctoral Fellow, Henry Ford Hospital, USA (美国 Henry Ford Hospital 博士后) |
| 3 | Research Scientist, Kyoto University, Japan (日本京都大学医学部 研究员) |
| 4 | The Dad Era: Father of Twins → Berkeley & Silicon Valley |

### Section C: The "Twins" Feature (Bento Box)

**Design:** Gold border box. Photo of twins.

**Headline:** The Proof of Concept (成功案例/教育蓝图)

**Text:** "I didn't just study education theory. I applied my scientific background to my own children. They went to Berkeley and Silicon Valley. Now, I use that exact same rigorous methodology to teach your child."

---

## IV. Page 3: SUCCESS STORIES (The Proof)

### Section A: The Wall of Truth (Masonry Grid)

**Design:** Cards of varying heights. Bold Gold text highlights key phrases.

#### Testimonial Card 1 (The Engagement)
- **Tag:** [Year 8 Student]
- **Highlight:** "Science is finally fun / 讲课生动有趣"
- **Text:** "Dr. Ricky shares stories from his time as a scientist... suddenly, that huge block of text just makes sense." / "曲博士会在科学课中给我们讲他自己作为科学家和医生的故事... 科学课原来这么有趣！"

#### Testimonial Card 2 (The Results)
- **Tag:** [Parent of Year 7]
- **Highlight:** "She actually understands it now / 讲课逻辑思维清晰"
- **Text:** "My daughter loves Dr. Ricky the most because she told me, 'Dad, I actually understood the lesson!'" / "每次课她都真地听懂了，而且题目真得会做了！"

#### Testimonial Card 3 (The Personalization)
- **Tag:** [VCE Parent]
- **Highlight:** "He truly knows my child / 了解每个孩子的学习情况"
- **Text:** "When he talks about my child's weaknesses, it matches exactly what I see at home. He is a 'Private Mentor'." / "他所说出来的情况和我在家里辅导的感受完全相同... 这样的老师，是孩子的'私房老师'。"

---

## V. Page 4: COURSES & PRICING (The Product)

### Section A: The Feature List (Icons + Text)

| Feature | Description |
|---------|-------------|
| Max 10 Students / 小班制 | "Every child gets challenged." |
| Hybrid Learning / 双模式教学 | "In-person (Scoresby) or Live Zoom." |
| Video Archive / 课程录像 | "Never miss a lesson due to sickness or camp." |
| Free Elite Materials / 独家教材免费 | "Cambridge ICE-EM + Custom Problem Sets." |

### Section B: Course Accordion (Collapsible List)

| Item | Course |
|------|--------|
| 1 | Year 6 (Primary to Secondary Prep) |
| 2 | Year 7-9 (Comprehensive Science & Math) |
| 3 | **Pre-VCE Strategy (9-10年级 抢跑计划)** ⭐ _Highlight this row in Gold_ |

**Expandable Text for Item 3:** "Finish Unit 1/2 Chemistry or Methods in Year 10. Strategic advantage for ATAR."

### Section C: Pricing Card

**Design:** Minimalist, clean card.

| Element | Value |
|---------|-------|
| Price | **$50 AUD / Session** |
| Subtext | Returning Family Rate (老学员优惠价) |
| Note | Billed per Term. Material Fees: $0 |

---

## VI. Page 5: ADMISSIONS (The Gate)

### Section A: The Process Tracker (Horizontal Steps)

| Step | Action |
|------|--------|
| 1 | Add WeChat (添加微信) |
| 2 | Download Entrance Test (下载入学测试) |
| 3 | Receive Diagnosis & Placement (获得诊断报告) |

### Section B: The Download Area

**Headline:** Results start with a diagnosis. / 拒绝盲目补习，从"诊断"开始。

**Button (Large, Icon: Download):**
`[ Download Entrance Test PDF / 下载入学测试题 ]`

**Subtext:** "This test is harder than school. It is designed to find the gaps in logic." (测试难度高于日校，旨在发现逻辑漏洞)

### Section C: Footer Logistics

| Element | Value |
|---------|-------|
| Address | 15 Rivette St, Scoresby, VIC, 3179 |
| Service Area | Glen Waverley, Wheelers Hill, Wantirna, Caulfield |
| Copyright | © 2025 Dr. Ricky's Education |

---

## Implementation Notes

This is the **Master Blueprint**. It merges the architectural layout with the actual copy.

Hand this document to a developer, and they can build the site without asking a single question.
