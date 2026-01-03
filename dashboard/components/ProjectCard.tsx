'use client';

import { Project, STATUS_COLORS } from '@/lib/types';
import { Calendar, CheckCircle2, FolderOpen, Play } from 'lucide-react';

type Props = {
  project: Project;
  onClick: () => void;
  onOpenFolder: (path: string) => void;
  onRunGui: (path: string, command: string) => void;
};

export default function ProjectCard({ project, onClick, onOpenFolder, onRunGui }: Props) {
  const completedTodos = project.todos.filter(t => t.completed).length;
  const totalTodos = project.todos.length;
  const progress = totalTodos > 0 ? (completedTodos / totalTodos) * 100 : 0;

  const nextTodo = project.todos.find(t => !t.completed);
  const shortPath = project.folderPath ? project.folderPath.split('\\').slice(-2).join('/') : 'N/A';

  const handleOpenFolder = (e: React.MouseEvent) => {
    e.stopPropagation();
    onOpenFolder(project.folderPath);
  };

  const handleRunGui = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (project.guiCommand) {
      onRunGui(project.folderPath, project.guiCommand);
    }
  };

  return (
    <div className={`${STATUS_COLORS[project.status]} p-4 rounded-lg border-2 hover:shadow-lg transition-shadow`}
    >
      {/* Title */}
      <h3 className="font-bold text-sm mb-2 line-clamp-2">
        {project.title}
      </h3>

      {/* Progress Bar */}
      {totalTodos > 0 && (
        <div className="mb-2">
          <div className="flex justify-between text-xs mb-1">
            <span>진행률</span>
            <span>{Math.round(progress)}%</span>
          </div>
          <div className="w-full bg-white/50 rounded-full h-2">
            <div
              className="bg-current h-2 rounded-full transition-all"
              style={{ width: `${progress}%` }}
            />
          </div>
        </div>
      )}

      {/* Next Todo */}
      {nextTodo && (
        <div className="flex items-start gap-2 mb-2">
          <CheckCircle2 className="w-4 h-4 mt-0.5 flex-shrink-0" />
          <p className="text-xs line-clamp-2">{nextTodo.text}</p>
        </div>
      )}

      {/* Folder Path */}
      <div className="text-xs text-gray-600 mb-2 truncate" title={project.folderPath}>
        {shortPath}
      </div>

      {/* Action Buttons */}
      <div className="flex gap-2 mb-2">
        <button
          onClick={handleOpenFolder}
          className="flex items-center gap-1 px-2 py-1 bg-white/70 hover:bg-white rounded text-xs"
        >
          <FolderOpen className="w-3 h-3" />
          폴더 열기
        </button>
        {project.hasGui && (
          <button
            onClick={handleRunGui}
            className="flex items-center gap-1 px-2 py-1 bg-white/70 hover:bg-white rounded text-xs"
          >
            <Play className="w-3 h-3" />
            GUI 실행
          </button>
        )}
      </div>

      {/* Title - clickable area for modal */}
      <div onClick={onClick} className="cursor-pointer">
        {/* Last Updated */}
        <div className="flex items-center gap-1 text-xs opacity-70">
          <Calendar className="w-3 h-3" />
          <span>{project.lastUpdated}</span>
        </div>
      </div>
    </div>
  );
}
