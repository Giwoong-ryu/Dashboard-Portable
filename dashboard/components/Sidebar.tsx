'use client';

import { Project, STATUS_ORDER, ProjectStatus } from '@/lib/types';

type Props = {
  projects: Project[];
  selectedView: 'status' | 'workspace';
  selectedStatus?: ProjectStatus;
  selectedWorkspace?: string;
  onViewChange: (view: 'status' | 'workspace', value?: string) => void;
};

export default function Sidebar({
  projects,
  selectedView,
  selectedStatus,
  selectedWorkspace,
  onViewChange
}: Props) {
  // 워크스페이스별 그룹핑
  const workspaceGroups = projects.reduce((acc, project) => {
    const workspace = project.workspace || '기타';
    if (!acc[workspace]) {
      acc[workspace] = [];
    }
    acc[workspace].push(project);
    return acc;
  }, {} as Record<string, Project[]>);

  const workspaces = Object.keys(workspaceGroups).sort();

  return (
    <div className="w-64 bg-white border-r border-gray-200 h-screen overflow-y-auto">
      <div className="p-4">
        <h2 className="text-lg font-bold mb-4">뷰 선택</h2>

        {/* 전체 상태별 */}
        <div className="mb-6">
          <button
            onClick={() => onViewChange('status')}
            className={`w-full text-left px-3 py-2 rounded mb-2 font-medium ${
              selectedView === 'status' && !selectedStatus
                ? 'bg-blue-100 text-blue-700'
                : 'hover:bg-gray-100'
            }`}
          >
            전체 상태별
          </button>
          {selectedView === 'status' && (
            <div className="ml-4 space-y-1">
              {STATUS_ORDER.map(status => {
                const count = projects.filter(p => p.status === status).length;
                return (
                  <button
                    key={status}
                    onClick={() => onViewChange('status', status)}
                    className={`w-full text-left px-3 py-1.5 rounded text-sm ${
                      selectedStatus === status
                        ? 'bg-blue-50 text-blue-700'
                        : 'hover:bg-gray-50'
                    }`}
                  >
                    {status} ({count})
                  </button>
                );
              })}
            </div>
          )}
        </div>

        {/* 워크스페이스별 */}
        <div>
          <button
            onClick={() => onViewChange('workspace')}
            className={`w-full text-left px-3 py-2 rounded mb-2 font-medium ${
              selectedView === 'workspace' && !selectedWorkspace
                ? 'bg-blue-100 text-blue-700'
                : 'hover:bg-gray-100'
            }`}
          >
            워크스페이스별
          </button>
          {selectedView === 'workspace' && (
            <div className="ml-4 space-y-1">
              {workspaces.map(workspace => {
                const count = workspaceGroups[workspace].length;
                return (
                  <button
                    key={workspace}
                    onClick={() => onViewChange('workspace', workspace)}
                    className={`w-full text-left px-3 py-1.5 rounded text-sm ${
                      selectedWorkspace === workspace
                        ? 'bg-blue-50 text-blue-700'
                        : 'hover:bg-gray-50'
                    }`}
                  >
                    <div className="truncate">{workspace}</div>
                    <div className="text-xs text-gray-500">({count})</div>
                  </button>
                );
              })}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
