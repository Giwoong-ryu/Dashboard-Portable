'use client';

import { Project, ProjectStatus, STATUS_ORDER } from '@/lib/types';
import { PieChart, Pie, Cell, ResponsiveContainer, Legend, Tooltip } from 'recharts';

type Props = {
  projects: Project[];
};

const COLORS: Record<ProjectStatus, string> = {
  '계획': '#9CA3AF',
  '개발': '#3B82F6',
  '테스트': '#EAB308',
  '배포': '#F97316',
  '운영': '#22C55E',
};

export default function StatusChart({ projects }: Props) {
  const data = STATUS_ORDER.map(status => ({
    name: status,
    value: projects.filter(p => p.status === status).length,
    color: COLORS[status],
  })).filter(d => d.value > 0);

  return (
    <div className="bg-white p-6 rounded-lg shadow-lg">
      <h2 className="text-xl font-bold mb-4">상태별 프로젝트 분포</h2>
      <ResponsiveContainer width="100%" height={300}>
        <PieChart>
          <Pie
            data={data}
            cx="50%"
            cy="50%"
            innerRadius={60}
            outerRadius={100}
            fill="#8884d8"
            dataKey="value"
            label={({ name, value }) => `${name}: ${value}개`}
          >
            {data.map((entry, index) => (
              <Cell key={`cell-${index}`} fill={entry.color} />
            ))}
          </Pie>
          <Tooltip />
          <Legend />
        </PieChart>
      </ResponsiveContainer>
    </div>
  );
}
