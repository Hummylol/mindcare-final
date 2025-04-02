// articledata.ts
interface Article {
  id: number;
  title: string;
  content: string;
}

export const articles: Record<string, Article[]> = {
  happy: [
    { 
      id: 1, 
      title: "The Science of Happiness: Understanding Your Brain's Joy Circuit", 
      content: "Recent neuroscience research has revealed fascinating insights into how happiness affects our brain chemistry. When we experience joy, our brain releases neurotransmitters like dopamine and serotonin, creating a cascade of positive effects throughout our body. This article explores the latest findings in positive psychology and how we can train our brain to experience more happiness naturally.\n\nKey points:\n• The role of neurotransmitters in happiness\n• How positive experiences shape our brain\n• Practical techniques for boosting happiness\n• The connection between physical health and mental well-being" 
    },
    { 
      id: 2, 
      title: "10 Scientifically Proven Ways to Stay Happy", 
      content: "Happiness isn't just a fleeting emotion—it's a skill we can develop. Here are ten evidence-based strategies to maintain a positive outlook:\n\n1. Practice gratitude daily\n2. Engage in regular physical exercise\n3. Maintain strong social connections\n4. Get adequate sleep\n5. Practice mindfulness meditation\n6. Set meaningful goals\n7. Help others through acts of kindness\n8. Spend time in nature\n9. Develop a growth mindset\n10. Celebrate small wins\n\nEach of these practices has been shown to increase levels of happiness and life satisfaction." 
    },
    { 
      id: 3, 
      title: "The Power of Positive Thinking: Transform Your Life", 
      content: "Positive thinking isn't just about being optimistic—it's a powerful tool for personal transformation. Research shows that maintaining a positive mindset can lead to better health outcomes, improved relationships, and greater success in life. Learn how to cultivate positive thinking patterns and overcome negative thought cycles.\n\nThis comprehensive guide covers:\n• The science behind positive thinking\n• Common obstacles to positive thinking\n• Practical exercises to develop positivity\n• Real-life success stories\n• Long-term strategies for maintaining a positive mindset" 
    }
  ],
  bored: [
    { 
      id: 1, 
      title: "50 Creative Activities to Beat Boredom", 
      content: "Boredom can be a gateway to creativity and self-discovery. Here's an extensive list of engaging activities that will help you break free from monotony:\n\nCreative Activities:\n• Learn a new language\n• Start a DIY project\n• Write a short story\n• Learn to play an instrument\n• Try digital art\n• Start a blog\n• Learn photography\n• Create a vision board\n\nPhysical Activities:\n• Try a new sport\n• Go hiking\n• Learn dance moves\n• Practice yoga\n• Start gardening\n• Go geocaching\n• Try rock climbing\n• Learn martial arts\n\nMental Activities:\n• Solve puzzles\n• Learn chess\n• Study astronomy\n• Read philosophy\n• Learn coding\n• Study history\n• Practice meditation\n• Learn magic tricks" 
    },
    { 
      id: 2, 
      title: "Transform Boredom into Productivity: A Complete Guide", 
      content: "Boredom often signals an opportunity for growth and development. This guide shows you how to channel your boredom into productive activities that can enhance your life:\n\nUnderstanding Boredom:\n• Why we feel bored\n• Types of boredom\n• The psychology behind boredom\n\nProductive Solutions:\n• Skill development strategies\n• Project planning techniques\n• Time management tips\n• Goal setting methods\n• Habit formation approaches\n\nPractical Applications:\n• Creating a boredom-busting routine\n• Setting up a productive workspace\n• Developing new interests\n• Building a learning schedule" 
    },
    { 
      id: 3, 
      title: "The Art of Mindful Boredom: Finding Peace in Stillness", 
      content: "Sometimes, boredom can be a gift—an opportunity to slow down and connect with ourselves. This article explores how to embrace and transform moments of boredom into meaningful experiences:\n\nKey Concepts:\n• The benefits of mindful boredom\n• How to practice presence\n• Finding joy in simple activities\n• Developing patience\n\nPractical Exercises:\n• Mindful observation\n• Deep breathing techniques\n• Sensory awareness practices\n• Creative visualization\n\nPersonal Growth:\n• Self-reflection methods\n• Journaling prompts\n• Meditation techniques\n• Mindfulness exercises" 
    }
  ],
  sad: [
    { 
      id: 1, 
      title: "Understanding and Coping with Sadness: A Comprehensive Guide", 
      content: "Sadness is a natural human emotion that we all experience. This comprehensive guide helps you understand and navigate through difficult emotional times:\n\nUnderstanding Sadness:\n• The science of sadness\n• Common triggers\n• The difference between sadness and depression\n• Emotional processing\n\nCoping Strategies:\n• Healthy emotional expression\n• Self-care practices\n• Support system building\n• Professional help options\n\nRecovery Techniques:\n• Mindfulness practices\n• Physical activity benefits\n• Creative expression\n• Social connection methods\n\nLong-term Wellness:\n• Building emotional resilience\n• Developing healthy habits\n• Setting boundaries\n• Creating a support plan" 
    },
    { 
      id: 2, 
      title: "The Healing Power of Self-Compassion", 
      content: "Self-compassion is a powerful tool for healing emotional pain. Learn how to treat yourself with kindness and understanding during difficult times:\n\nCore Components:\n• Self-kindness vs. self-judgment\n• Common humanity\n• Mindfulness\n• Emotional awareness\n\nPractical Applications:\n• Daily self-compassion exercises\n• Positive self-talk techniques\n• Self-care rituals\n• Boundary setting\n\nHealing Practices:\n• Meditation for self-compassion\n• Journaling exercises\n• Body awareness techniques\n• Emotional release methods\n\nBuilding Resilience:\n• Developing inner strength\n• Creating support systems\n• Setting healthy boundaries\n• Building emotional awareness" 
    },
    { 
      id: 3, 
      title: "Finding Light in Dark Times: A Journey of Hope", 
      content: "Even in our darkest moments, there is always hope. This article explores ways to find and nurture hope during difficult times:\n\nUnderstanding Hope:\n• The psychology of hope\n• Hope vs. optimism\n• Building hope resilience\n• The role of faith\n\nPractical Strategies:\n• Goal setting techniques\n• Positive visualization\n• Gratitude practices\n• Meaning-making exercises\n\nSupport Systems:\n• Building connections\n• Seeking professional help\n• Creating support networks\n• Community resources\n\nGrowth Opportunities:\n• Learning from challenges\n• Building resilience\n• Developing new skills\n• Finding purpose" 
    }
  ],
  angry: [
    { 
      id: 1, 
      title: "Mastering Anger: A Complete Guide to Emotional Control", 
      content: "Anger is a powerful emotion that, when managed properly, can be a catalyst for positive change. This comprehensive guide helps you understand and control your anger:\n\nUnderstanding Anger:\n• The psychology of anger\n• Common triggers\n• Physical responses\n• Warning signs\n\nManagement Techniques:\n• Breathing exercises\n• Progressive muscle relaxation\n• Cognitive restructuring\n• Time-out strategies\n\nCommunication Skills:\n• Assertive expression\n• Active listening\n• Conflict resolution\n• Boundary setting\n\nLong-term Solutions:\n• Stress management\n• Lifestyle changes\n• Professional support\n• Personal growth strategies" 
    },
    { 
      id: 2, 
      title: "The Science of Anger Management: Evidence-Based Approaches", 
      content: "Recent research has provided valuable insights into effective anger management techniques. This article explores scientifically-proven methods for controlling anger:\n\nScientific Understanding:\n• Neurological aspects of anger\n• Hormonal responses\n• Behavioral patterns\n• Environmental factors\n\nEvidence-Based Techniques:\n• Mindfulness-based approaches\n• Cognitive behavioral therapy\n• Physical exercise benefits\n• Relaxation techniques\n\nPractical Applications:\n• Daily anger management exercises\n• Stress reduction methods\n• Emotional awareness practices\n• Response modification\n\nProfessional Support:\n• Therapy options\n• Support groups\n• Online resources\n• Crisis intervention" 
    },
    { 
      id: 3, 
      title: "Transform Anger into Positive Energy: A Practical Guide", 
      content: "Anger can be channeled into constructive action. Learn how to transform your anger into positive energy and productive outcomes:\n\nUnderstanding Transformation:\n• Energy redirection\n• Positive outlets\n• Creative expression\n• Physical activity\n\nPractical Techniques:\n• Journaling methods\n• Artistic expression\n• Exercise routines\n• Meditation practices\n\nPersonal Development:\n• Emotional intelligence\n• Self-awareness\n• Communication skills\n• Problem-solving abilities\n\nLong-term Growth:\n• Building resilience\n• Developing patience\n• Creating healthy habits\n• Setting positive goals" 
    }
  ]
};
