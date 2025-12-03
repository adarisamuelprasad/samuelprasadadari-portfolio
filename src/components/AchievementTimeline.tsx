import { motion } from 'framer-motion';
import { Award } from 'lucide-react';
import type { Achievement } from '@/api/api';

interface AchievementTimelineProps {
  achievements: Achievement[];
}

const AchievementTimeline = ({ achievements }: AchievementTimelineProps) => {
  return (
    <div className="relative">
      {/* Vertical line */}
      <div className="absolute left-4 top-0 h-full w-0.5 bg-gradient-to-b from-primary via-accent to-primary/20 md:left-1/2 md:-translate-x-1/2" />

      <div className="space-y-12">
        {achievements.map((achievement, index) => (
          <motion.div
            key={achievement.id}
            initial={{ opacity: 0, x: index % 2 === 0 ? -50 : 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: index * 0.1 }}
            className={`relative flex items-center ${
              index % 2 === 0 ? 'md:flex-row' : 'md:flex-row-reverse'
            }`}
          >
            {/* Timeline dot */}
            <div className="absolute left-4 z-10 flex h-8 w-8 items-center justify-center rounded-full bg-primary text-primary-foreground md:left-1/2 md:-translate-x-1/2">
              <Award size={16} />
            </div>

            {/* Content */}
            <div
              className={`ml-16 w-full md:ml-0 md:w-[calc(50%-2rem)] ${
                index % 2 === 0 ? 'md:pr-8 md:text-right' : 'md:pl-8'
              }`}
            >
              <div className="glass-card p-6">
                <span className="mb-2 inline-block rounded-full bg-primary/10 px-3 py-1 text-sm font-medium text-primary">
                  {achievement.year}
                </span>
                <h3 className="mb-2 text-xl font-semibold text-foreground">{achievement.title}</h3>
                <p className="text-muted-foreground">{achievement.description}</p>
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
};

export default AchievementTimeline;
