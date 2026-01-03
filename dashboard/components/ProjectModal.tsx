'use client';

import { Project, ProjectStatus, STATUS_ORDER } from '@/lib/types';
import { X } from 'lucide-react';
import { useState } from 'react';

type Props = {
  project: Project | null;
  onClose: () => void;
  onSave: (project: Project) => void;
  onDelete?: (id: number) => void;
};

const WORKSPACE_OPTIONS = ['개발팀', '재무팀', '영업팀', '마케팅팀', '운영팀', '기타'];

export default function ProjectModal({ project, onClose, onSave, onDelete }: Props) {
  const [title, setTitle] = useState(project?.title || '');
  const [status, setStatus] = useState<ProjectStatus>(project?.status || '계획');
  const [category, setCategory] = useState(project?.category.join(', ') || '');
  const [impact, setImpact] = useState(project?.impact || '');
  const [folderPath, setFolderPath] = useState(project?.folderPath || '');
  const [workspace, setWorkspace] = useState(project?.workspace || '개발팀');
  const [hasGui, setHasGui] = useState(project?.hasGui || false);
  const [guiCommand, setGuiCommand] = useState(project?.guiCommand || '');
  const [todos, setTodos] = useState(project?.todos || []);

  const handleSave = () => {
    const updatedProject: Project = {
      id: project?.id || Date.now(),
      title,
      category: category.split(',').map(c => c.trim()).filter(Boolean),
      status,
      todos,
      lastUpdated: new Date().toISOString().split('T')[0],
      impact,
      folderPath,
      workspace,
      hasGui,
      guiCommand: hasGui ? guiCommand : undefined,
    };
    onSave(updatedProject);
    onClose();
  };

  const toggleTodo = (id: string) => {
    setTodos(todos.map(t => t.id === id ? { ...t, completed: !t.completed } : t));
  };

  const addTodo = () => {
    setTodos([...todos, { id: Date.now().toString(), text: '', completed: false }]);
  };

  const updateTodoText = (id: string, text: string) => {
    setTodos(todos.map(t => t.id === id ? { ...t, text } : t));
  };

  const removeTodo = (id: string) => {
    setTodos(todos.filter(t => t.id !== id));
  };

  if (!project && !onSave) return null;

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-lg max-w-2xl w-full max-h-[90vh] overflow-y-auto">
        <div className="p-6">
          {/* Header */}
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-2xl font-bold">
              {project ? '프로젝트 수정' : '새 프로젝트'}
            </h2>
            <button onClick={onClose} className="p-2 hover:bg-gray-100 rounded">
              <X className="w-6 h-6" />
            </button>
          </div>

          {/* Form */}
          <div className="space-y-4">
            {/* Title */}
            <div>
              <label className="block text-sm font-medium mb-1">제목</label>
              <input
                type="text"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                className="w-full px-3 py-2 border rounded-lg"
                placeholder="프로젝트 제목"
              />
            </div>

            {/* Status */}
            <div>
              <label className="block text-sm font-medium mb-1">상태</label>
              <select
                value={status}
                onChange={(e) => setStatus(e.target.value as ProjectStatus)}
                className="w-full px-3 py-2 border rounded-lg"
              >
                {STATUS_ORDER.map(s => (
                  <option key={s} value={s}>{s}</option>
                ))}
              </select>
            </div>

            {/* Category */}
            <div>
              <label className="block text-sm font-medium mb-1">
                카테고리 (쉼표로 구분)
              </label>
              <input
                type="text"
                value={category}
                onChange={(e) => setCategory(e.target.value)}
                className="w-full px-3 py-2 border rounded-lg"
                placeholder="AI, Automation"
              />
            </div>

            {/* Impact */}
            <div>
              <label className="block text-sm font-medium mb-1">성과</label>
              <input
                type="text"
                value={impact}
                onChange={(e) => setImpact(e.target.value)}
                className="w-full px-3 py-2 border rounded-lg"
                placeholder="시간 90% 단축"
              />
            </div>

            {/* Folder Path */}
            <div>
              <label className="block text-sm font-medium mb-1">폴더 경로</label>
              <input
                type="text"
                value={folderPath}
                onChange={(e) => setFolderPath(e.target.value)}
                className="w-full px-3 py-2 border rounded-lg"
                placeholder="C:\Users\user\Desktop\gpt\..."
              />
            </div>

            {/* Workspace */}
            <div>
              <label className="block text-sm font-medium mb-1">워크스페이스</label>
              <select
                value={workspace}
                onChange={(e) => setWorkspace(e.target.value)}
                className="w-full px-3 py-2 border rounded-lg"
              >
                {WORKSPACE_OPTIONS.map(w => (
                  <option key={w} value={w}>{w}</option>
                ))}
              </select>
            </div>

            {/* GUI Settings */}
            <div>
              <label className="flex items-center gap-2 mb-2">
                <input
                  type="checkbox"
                  checked={hasGui}
                  onChange={(e) => setHasGui(e.target.checked)}
                  className="w-4 h-4"
                />
                <span className="text-sm font-medium">GUI 실행 가능</span>
              </label>
              {hasGui && (
                <input
                  type="text"
                  value={guiCommand}
                  onChange={(e) => setGuiCommand(e.target.value)}
                  className="w-full px-3 py-2 border rounded-lg"
                  placeholder="python gui_launcher.py"
                />
              )}
            </div>

            {/* Todos */}
            <div>
              <div className="flex justify-between items-center mb-2">
                <label className="block text-sm font-medium">할 일 목록</label>
                <button
                  onClick={addTodo}
                  className="text-sm text-blue-600 hover:underline"
                >
                  + 추가
                </button>
              </div>
              <div className="space-y-2">
                {todos.map(todo => (
                  <div key={todo.id} className="flex items-center gap-2">
                    <input
                      type="checkbox"
                      checked={todo.completed}
                      onChange={() => toggleTodo(todo.id)}
                      className="w-5 h-5"
                    />
                    <input
                      type="text"
                      value={todo.text}
                      onChange={(e) => updateTodoText(todo.id, e.target.value)}
                      className="flex-1 px-3 py-2 border rounded-lg"
                      placeholder="할 일 입력"
                    />
                    <button
                      onClick={() => removeTodo(todo.id)}
                      className="text-red-600 hover:bg-red-50 p-2 rounded"
                    >
                      <X className="w-4 h-4" />
                    </button>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Actions */}
          <div className="flex justify-between mt-6">
            {project && onDelete && (
              <button
                onClick={() => {
                  if (confirm('정말 삭제하시겠습니까?')) {
                    onDelete(project.id);
                    onClose();
                  }
                }}
                className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700"
              >
                삭제
              </button>
            )}
            <div className="flex gap-2 ml-auto">
              <button
                onClick={onClose}
                className="px-4 py-2 border rounded-lg hover:bg-gray-50"
              >
                취소
              </button>
              <button
                onClick={handleSave}
                className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
              >
                저장
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
