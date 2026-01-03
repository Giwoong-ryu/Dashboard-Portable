export type ProjectStatus = '계획' | '개발' | '테스트' | '배포' | '운영';

export type Todo = {
  id: string;
  text: string;
  completed: boolean;
};

export type Recommendation = {
  id: string;
  type: 'extension' | 'integration';
  title: string;
  description: string;
  relatedProjectIds?: number[];
};

export type ExecutableAction = {
  type: 'gui' | 'folder' | 'vscode' | 'terminal';
  label: string;
  path: string;
  command?: string;
};

export type Workspace = {
  id: string;
  name: string;
  path: string;
  purpose: string;
  direction: string;
  projectIds: number[];
  recommendations: Recommendation[];
  actions: ExecutableAction[];
};

export type Project = {
  id: number;
  title: string;
  category: string[];
  status: ProjectStatus;
  todos: Todo[];
  lastUpdated: string;
  impact: string;
  folderPath: string;
  workspace: string; // GUI 프로그램, 웹, n8n, MCP, 시스템, 기타
  hasGui?: boolean;
  guiCommand?: string;
};

export const STATUS_COLORS: Record<ProjectStatus, string> = {
  '계획': 'bg-gray-200 border-gray-400 text-gray-700',
  '개발': 'bg-blue-200 border-blue-400 text-blue-700',
  '테스트': 'bg-yellow-200 border-yellow-400 text-yellow-700',
  '배포': 'bg-orange-200 border-orange-400 text-orange-700',
  '운영': 'bg-green-200 border-green-400 text-green-700',
};

export const STATUS_ORDER: ProjectStatus[] = ['계획', '개발', '테스트', '배포', '운영'];
