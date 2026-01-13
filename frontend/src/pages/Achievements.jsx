import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import SectionTitle from "@/components/SectionTitle";
import AchievementTimeline from "@/components/AchievementTimeline";
import { achievementsApi } from "@/api/api";

const Achievements = () => {
  const [achievements, setAchievements] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchAchievements = async () => {
      try {
        const response = await achievementsApi.getAll();
        setAchievements(response.data);
      } catch (error) {
        console.error("Failed to fetch achievements:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchAchievements();
  }, []);

  return <><Navbar /><main className="min-h-screen pt-24"><div className="container mx-auto px-6 py-12"><SectionTitle
    title="Achievements"
    subtitle="Milestones and accomplishments throughout my career"
  />{loading ? <div className="flex justify-center py-20"><div className="h-12 w-12 animate-spin rounded-full border-4 border-primary border-t-transparent" /></div> : <motion.div
    initial={{ opacity: 0 }}
    animate={{ opacity: 1 }}
    className="mx-auto max-w-4xl"
  ><AchievementTimeline achievements={achievements} /></motion.div>}{!loading && achievements.length === 0 && <div className="py-20 text-center"><p className="text-muted-foreground">No achievements found.</p></div>}</div></main><Footer /></>;
};
export default Achievements;
