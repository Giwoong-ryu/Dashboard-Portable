'use client';

import { useState, useEffect } from 'react';
import { DndContext, DragEndEvent, closestCenter } from '@dnd-kit/core';
import { SortableContext, verticalListSortingStrategy } from '@dnd-kit/sortable';
import { Download, Upload, Plus, Edit } from 'lucide-react';

import { Project, ProjectStatus, STATUS_ORDER } from '@/lib/types';
import { loadProjects, saveProjects, exportData, importData } from '@/lib/storage';
import { loadProjectsFromJSON, getDefaultProjects } from '@/lib/initialData';
import ProjectCard from '@/components/ProjectCard';
import ProjectModal from '@/components/ProjectModal';
import StatusChart from '@/components/StatusChart';
import Sidebar from '@/components/Sidebar';

export default function Home() {
  const [projects, setProjects] = useState<Project[]>([]);
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);
  const [showModal, setShowModal] = useState(false);

  // View state
  const [selectedView, setSelectedView] = useState<'status' | 'workspace'>('status');
  const [selectedStatus, setSelectedStatus] = useState<ProjectStatus | undefined>();
  const [selectedWorkspace, setSelectedWorkspace] = useState<string | undefined>();

  // 편집 모드 상태
  const [editMode, setEditMode] = useState(false);
  const [aiTool, setAiTool] = useState<'gemini' | 'gpt'>('gemini');
  const [jsonText, setJsonText] = useState('');

  useEffect(() => {
    async function initProjects() {
      const stored = loadProjects();

      // public/projects.json 우선 로드 시도
      const jsonProjects = await loadProjectsFromJSON();

      // LocalStorage가 비어있으면 JSON 또는 기본값 사용
      if (stored.length === 0) {
        console.log('초기 로드: projects.json 또는 기본 데이터 사용');
        setProjects(jsonProjects);
        saveProjects(jsonProjects);
        return;
      }

      // 구버전 데이터 감지 → 자동 마이그레이션
      const needsMigration = stored.some(p => !p.folderPath || !p.workspace);
      if (needsMigration) {
        console.log('구버전 데이터 감지 - 마이그레이션 중...');
        setProjects(jsonProjects);
        saveProjects(jsonProjects);
      } else {
        setProjects(stored);
      }
    }

    initProjects();
  }, []);

  useEffect(() => {
    if (projects.length > 0) {
      saveProjects(projects);
    }
  }, [projects]);

  const handleDragEnd = (event: DragEndEvent) => {
    const { active, over } = event;
    if (!over) return;

    const projectId = Number(active.id);
    const newStatus = over.id as ProjectStatus;

    setProjects(prev =>
      prev.map(p =>
        p.id === projectId
          ? { ...p, status: newStatus, lastUpdated: new Date().toISOString().split('T')[0] }
          : p
      )
    );
  };

  const handleSave = (project: Project) => {
    setProjects(prev => {
      const exists = prev.find(p => p.id === project.id);
      if (exists) {
        return prev.map(p => (p.id === project.id ? project : p));
      }
      return [...prev, project];
    });
  };

  const handleDelete = (id: number) => {
    setProjects(prev => prev.filter(p => p.id !== id));
  };

  const handleExport = () => {
    const data = exportData();
    const blob = new Blob([data], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `projects-${new Date().toISOString().split('T')[0]}.json`;
    a.click();
    URL.revokeObjectURL(url);
  };

  const handleImport = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = (event) => {
      try {
        const imported = importData(event.target?.result as string);
        setProjects(imported);
        alert('데이터를 성공적으로 불러왔습니다!');
      } catch {
        alert('잘못된 JSON 형식입니다.');
      }
    };
    reader.readAsText(file);
  };

  const handleOpenFolder = async (path: string) => {
    try {
      const response = await fetch('http://localhost:3001/api/open-folder', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ path })
      });

      const result = await response.json();

      if (!result.success) {
        alert(`폴더 열기 실패:\n${result.error}`);
      }
    } catch (error) {
      alert('API 서버 연결 실패\n\napi_server.py를 실행하세요:\npython api_server.py');
    }
  };

  const handleRunGui = async (path: string, command: string) => {
    try {
      const response = await fetch('http://localhost:3001/api/run-gui', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ path, command })
      });

      const result = await response.json();

      if (result.success) {
        alert(`GUI 실행 성공\nPID: ${result.pid}`);
      } else {
        alert(`GUI 실행 실패:\n${result.error}`);
      }
    } catch (error) {
      alert('API 서버 연결 실패\n\napi_server.py를 실행하세요:\npython api_server.py');
    }
  };

  const handleEditJson = async () => {
    // 1. JSON 로드 + 편집 모드 활성화
    try {
      const response = await fetch('/projects.json');
      const text = await response.text();
      setJsonText(text);
      setEditMode(true);

      // 2. AI 도구 새 탭 열기
      const url = aiTool === 'gemini'
        ? 'https://gemini.google.com'
        : 'https://chat.openai.com';
      window.open(url, '_blank');

      // 3. Chrome 분할 보기 사용법 안내
      setTimeout(() => {
        alert(
          '💡 Chrome 분할 보기 사용법:\n\n' +
          '1. 위쪽 새 탭(AI 도구) 우클릭\n' +
          '2. "새 탭 그룹에 추가" 선택\n' +
          '3. 탭 그룹 우클릭 → "탭을 분할 보기에 추가"\n\n' +
          '→ 왼쪽: AI 도구 / 오른쪽: 대시보드+에디터\n\n' +
          'AI에게 JSON 수정 요청 → 복사 → 아래 에디터에 붙여넣기 → 저장!'
        );
      }, 1500);
    } catch (error) {
      alert('projects.json 파일을 불러올 수 없습니다.');
    }
  };

  const handleSaveJson = () => {
    try {
      // JSON 유효성 검증
      const parsed = JSON.parse(jsonText);

      // LocalStorage에 저장
      setProjects(parsed.projects || parsed);
      saveProjects(parsed.projects || parsed);

      alert('저장 완료!\n\n변경사항이 적용되었습니다.');
      setEditMode(false);
    } catch (error) {
      alert('잘못된 JSON 형식입니다.\n\n다시 확인해주세요.');
    }
  };

  const handleViewChange = (view: 'status' | 'workspace', value?: string) => {
    setSelectedView(view);
    if (view === 'status') {
      setSelectedStatus(value as ProjectStatus | undefined);
      setSelectedWorkspace(undefined);
    } else {
      setSelectedWorkspace(value);
      setSelectedStatus(undefined);
    }
  };

  // 필터링된 프로젝트
  const filteredProjects = projects.filter(p => {
    if (selectedView === 'status') {
      return selectedStatus ? p.status === selectedStatus : true;
    } else {
      return selectedWorkspace ? p.workspace === selectedWorkspace : true;
    }
  });

  const totalProjects = projects.length;
  const inProgress = projects.filter(p => ['개발', '테스트', '배포'].includes(p.status)).length;
  const operating = projects.filter(p => p.status === '운영').length;

  const aiUrl = aiTool === 'gemini'
    ? 'https://gemini.google.com'
    : 'https://chat.openai.com';

  return (
    <div className="flex h-screen bg-gray-50">
      {/* Sidebar */}
      <Sidebar
        projects={projects}
        selectedView={selectedView}
        selectedStatus={selectedStatus}
        selectedWorkspace={selectedWorkspace}
        onViewChange={handleViewChange}
      />

      {/* Main Content */}
      <div className={`flex-1 overflow-y-auto p-8 ${editMode ? 'pr-0' : ''}`}>
        {/* Header */}
        <div className="max-w-7xl mx-auto mb-8">
          <div className="flex justify-between items-center mb-6">
            <h1 className="text-3xl font-bold">프로젝트 대시보드</h1>
            <div className="flex gap-2">
              <button
                onClick={handleEditJson}
                className="flex items-center gap-3 px-8 py-4 bg-gradient-to-r from-purple-600 to-pink-600 text-white text-lg font-bold rounded-xl hover:from-purple-700 hover:to-pink-700 shadow-lg hover:shadow-xl transition-all"
              >
                <Edit className="w-6 h-6" />
                데이터 수정
              </button>
              <label className="flex items-center gap-2 px-4 py-2 bg-white border rounded-lg cursor-pointer hover:bg-gray-50">
                <Upload className="w-4 h-4" />
                <span>가져오기</span>
                <input type="file" accept=".json" onChange={handleImport} className="hidden" />
              </label>
              <button
                onClick={handleExport}
                className="flex items-center gap-2 px-4 py-2 bg-white border rounded-lg hover:bg-gray-50"
              >
                <Download className="w-4 h-4" />
                내보내기
              </button>
              <button
                onClick={() => {
                  setSelectedProject(null);
                  setShowModal(true);
                }}
                className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
              >
                <Plus className="w-4 h-4" />
                새 프로젝트
              </button>
            </div>
          </div>

          {/* Stats Cards */}
          <div className="grid grid-cols-3 gap-4 mb-6">
            <div className="bg-white p-6 rounded-lg shadow-lg">
              <div className="text-sm text-gray-600 mb-1">전체 프로젝트</div>
              <div className="text-3xl font-bold">{totalProjects}</div>
            </div>
            <div className="bg-white p-6 rounded-lg shadow-lg">
              <div className="text-sm text-gray-600 mb-1">진행 중</div>
              <div className="text-3xl font-bold text-blue-600">{inProgress}</div>
            </div>
            <div className="bg-white p-6 rounded-lg shadow-lg">
              <div className="text-sm text-gray-600 mb-1">운영 중</div>
              <div className="text-3xl font-bold text-green-600">{operating}</div>
            </div>
          </div>

          {/* Chart */}
          <StatusChart projects={projects} />
        </div>

        {/* Content based on view */}
        <div className="max-w-7xl mx-auto">
          {selectedView === 'status' && !selectedStatus && (
            // Kanban Board for all statuses
            <DndContext collisionDetection={closestCenter} onDragEnd={handleDragEnd}>
              <div className="grid grid-cols-5 gap-4">
                {STATUS_ORDER.map(status => {
                  const statusProjects = projects.filter(p => p.status === status);
                  return (
                    <div key={status} className="bg-gray-100 p-4 rounded-lg">
                      <h2 className="font-bold mb-4 text-center">
                        {status} ({statusProjects.length})
                      </h2>
                      <SortableContext
                        items={statusProjects.map(p => p.id)}
                        strategy={verticalListSortingStrategy}
                      >
                        <div className="space-y-3">
                          {statusProjects.map(project => (
                            <ProjectCard
                              key={project.id}
                              project={project}
                              onClick={() => {
                                setSelectedProject(project);
                                setShowModal(true);
                              }}
                              onOpenFolder={handleOpenFolder}
                              onRunGui={handleRunGui}
                            />
                          ))}
                        </div>
                      </SortableContext>
                    </div>
                  );
                })}
              </div>
            </DndContext>
          )}

          {(selectedStatus || selectedWorkspace) && (
            // Grid view for filtered projects
            <div>
              <h2 className="text-2xl font-bold mb-4">
                {selectedStatus || selectedWorkspace}
              </h2>
              <div className="grid grid-cols-4 gap-4">
                {filteredProjects.map(project => (
                  <ProjectCard
                    key={project.id}
                    project={project}
                    onClick={() => {
                      setSelectedProject(project);
                      setShowModal(true);
                    }}
                    onOpenFolder={handleOpenFolder}
                    onRunGui={handleRunGui}
                  />
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Modal */}
        {showModal && (
          <ProjectModal
            project={selectedProject}
            onClose={() => {
              setShowModal(false);
              setSelectedProject(null);
            }}
            onSave={handleSave}
            onDelete={handleDelete}
          />
        )}
      </div>

      {/* JSON 편집 패널 (오른쪽) */}
      {editMode && (
        <div className="w-1/3 border-l bg-white flex flex-col h-screen">
          {/* 헤더 */}
          <div className="p-4 border-b bg-gradient-to-r from-purple-50 to-pink-50">
            <div className="flex justify-between items-center mb-3">
              <h2 className="text-lg font-bold text-gray-800">JSON 에디터</h2>
              <button
                onClick={() => setEditMode(false)}
                className="px-4 py-2 bg-red-100 text-red-700 rounded-lg hover:bg-red-200 font-bold text-sm"
              >
                닫기
              </button>
            </div>
            <p className="text-xs text-gray-600">
              왼쪽 탭(AI 도구)에서 수정된 JSON을 복사해서 붙여넣으세요
            </p>
          </div>

          {/* JSON 편집기 */}
          <div className="flex-1 flex flex-col">
            <div className="p-3 bg-gray-50 border-b flex justify-between items-center">
              <span className="font-mono text-sm font-bold text-gray-700">projects.json</span>
              <button
                onClick={handleSaveJson}
                className="px-6 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 font-bold shadow-md hover:shadow-lg transition-all"
              >
                ✅ 저장
              </button>
            </div>
            <textarea
              value={jsonText}
              onChange={(e) => setJsonText(e.target.value)}
              className="flex-1 p-6 font-mono text-sm border-0 resize-none focus:outline-none bg-gray-50"
              spellCheck={false}
              placeholder="AI가 생성한 JSON을 여기에 붙여넣으세요..."
            />
          </div>

          {/* 사용 팁 */}
          <div className="p-4 bg-blue-50 border-t">
            <p className="text-xs text-blue-800 font-medium mb-2">💡 사용 팁</p>
            <ul className="text-xs text-blue-700 space-y-1">
              <li>• AI에게 "프로젝트 추가해줘" 요청</li>
              <li>• 수정된 JSON 전체 복사 (Ctrl+A, Ctrl+C)</li>
              <li>• 여기에 붙여넣기 (Ctrl+V)</li>
              <li>• "✅ 저장" 버튼 클릭!</li>
            </ul>
          </div>
        </div>
      )}
    </div>
  );
}
