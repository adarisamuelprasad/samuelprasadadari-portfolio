import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import SectionTitle from '@/components/SectionTitle';
import AchievementTimeline from '@/components/AchievementTimeline';
import type { Achievement } from '@/api/api';

// Mock data - Replace with API call when backend is ready
const mockAchievements: Achievement[] = [
  {
    id: 1,
    title: 'AWS Solutions Architect Professional',
    year: '2024',
    description: 'Achieved professional-level AWS certification demonstrating expertise in designing distributed systems and cost optimization.',
  },
  {
    id: 2,
    title: 'Open Source Contributor Award',
    year: '2023',
    description: 'Recognized for significant contributions to major open-source projects including Spring Framework and Apache Kafka.',
  },
  {
    id: 3,
    title: 'Tech Lead Promotion',
    year: '2023',
    description: 'Promoted to Tech Lead, overseeing a team of 8 engineers and driving architectural decisions for critical projects.',
  },
  {
    id: 4,
    title: 'Hackathon Winner - AI Innovation',
    year: '2022',
    description: 'First place in company-wide hackathon for developing an AI-powered code review assistant.',
  },
  {
    id: 5,
    title: 'Master\'s in Computer Science',
    year: '2021',
    description: 'Completed M.S. in Computer Science with specialization in Distributed Systems from Stanford University.',
  },
  {
    id: 6,
    title: 'Google Cloud Professional',
    year: '2020',
    description: 'Obtained Google Cloud Professional Cloud Architect certification.',
  },
];

const Achievements = () => {
  const [achievements, setAchievements] = useState<Achievement[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // TODO: Replace with actual API call
    setTimeout(() => {
      setAchievements(mockAchievements);
      setLoading(false);
    }, 500);
  }, []);

  return (
    <>
      <Navbar />
      <main className="min-h-screen pt-24">
        <div className="container mx-auto px-6 py-12">
          <SectionTitle
            title="Achievements"
            subtitle="Milestones and accomplishments throughout my career"
          />

          {loading ? (
            <div className="flex justify-center py-20">
              <div className="h-12 w-12 animate-spin rounded-full border-4 border-primary border-t-transparent" />
            </div>
          ) : (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="mx-auto max-w-4xl"
            >
              <AchievementTimeline achievements={achievements} />
            </motion.div>
          )}

          {!loading && achievements.length === 0 && (
            <div className="py-20 text-center">
              <p className="text-muted-foreground">No achievements found.</p>
            </div>
          )}
        </div>
      </main>
      <Footer />
    </>
  );
};

export default Achievements;
