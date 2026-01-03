import { Workspace } from './types';

export const initialWorkspaces: Workspace[] = [
  {
    id: 'rag-system',
    name: 'RAG System',
    path: 'C:\\Users\\user\\Desktop\\gpt\\n8n-make\\RAG\\kakao',
    purpose: '카카오톡 대화 내용을 자동으로 분석하여 실행 가능한 인사이트로 변환',
    direction: 'Recipe 스키마 기반 통합 지식베이스 구축 → LightRAG 연동 → 자동 적용 시스템',
    projectIds: [2, 31], // KakaoTalk RAG 자동화, RAG ETL Pipeline
    recommendations: [
      {
        id: 'rag-rec-1',
        type: 'extension',
        title: 'Slack/Discord 통합',
        description: '현재 카카오톡만 지원하는 RAG 시스템을 Slack, Discord로 확장하여 팀 커뮤니케이션 전체를 분석',
        relatedProjectIds: [19] // Source Adapter
      },
      {
        id: 'rag-rec-2',
        type: 'integration',
        title: 'Dev Insights 자동 적용',
        description: 'GeekNews에서 수집한 개발 인사이트를 RAG 시스템과 연계하여 자동으로 프로젝트에 적용',
        relatedProjectIds: [3] // Dev Insights Auto Crawler
      },
      {
        id: 'rag-rec-3',
        type: 'extension',
        title: '주간 리포트 자동 생성',
        description: '대화 내용 분석 결과를 기반으로 주간 업무 리포트 자동 생성 (성과, 진행사항, 다음 계획)',
        relatedProjectIds: []
      }
    ],
    actions: [
      {
        type: 'gui',
        label: 'RAG GUI 실행',
        path: 'C:\\Users\\user\\Desktop\\gpt\\n8n-make\\RAG\\kakao\\scripts\\gui_app_final.py',
        command: 'python gui_app_final.py'
      },
      {
        type: 'folder',
        label: '폴더 열기',
        path: 'C:\\Users\\user\\Desktop\\gpt\\n8n-make\\RAG\\kakao'
      },
      {
        type: 'vscode',
        label: 'VSCode에서 열기',
        path: 'C:\\Users\\user\\Desktop\\gpt\\n8n-make\\RAG\\kakao'
      }
    ]
  },
  {
    id: 'dev-insights',
    name: 'Dev Insights System',
    path: 'C:\\Users\\user\\Desktop\\gpt\\n8n-make\\automation\\scripts\\dev_insights',
    purpose: 'GeekNews, Reddit 등에서 개발 인사이트를 자동 수집하고 VRIO 분석으로 적용 가능성 평가',
    direction: 'Knowledge Base 구축 → Flamehaven 통합 검색 → 자동 적용 워크플로우',
    projectIds: [3], // Dev Insights Auto Crawler
    recommendations: [
      {
        id: 'dev-rec-1',
        type: 'extension',
        title: 'GitHub Trending 통합',
        description: 'GitHub Trending, Hacker News 등 추가 소스 통합으로 인사이트 범위 확대',
        relatedProjectIds: []
      },
      {
        id: 'dev-rec-2',
        type: 'integration',
        title: 'Tech Intel System 연동',
        description: '카카오톡 대화에서 나온 기술 고민과 Dev Insights를 매칭하여 해결책 자동 제안',
        relatedProjectIds: [2, 31]
      },
      {
        id: 'dev-rec-3',
        type: 'extension',
        title: '월간 트렌드 리포트',
        description: '수집된 인사이트를 월별로 분석하여 기술 트렌드 리포트 자동 생성',
        relatedProjectIds: []
      }
    ],
    actions: [
      {
        type: 'gui',
        label: 'Auto Crawler GUI',
        path: 'C:\\Users\\user\\Desktop\\gpt\\n8n-make\\automation\\scripts\\dev_insights\\autocrawler_gui.py',
        command: 'python autocrawler_gui.py'
      },
      {
        type: 'folder',
        label: '폴더 열기',
        path: 'C:\\Users\\user\\Desktop\\gpt\\n8n-make\\automation\\scripts\\dev_insights'
      }
    ]
  },
  {
    id: 'ai-infrastructure',
    name: 'AI Infrastructure',
    path: 'C:\\Users\\user\\Desktop\\gpt',
    purpose: 'AI 워크플로우 가속화를 위한 MCP 서버, 캐싱 시스템, 파일 검색 등 핵심 인프라',
    direction: 'MCP 에코시스템 확장 → Claude Agent SDK 통합 → 비용 최적화',
    projectIds: [5, 6, 8, 9, 27], // Vision OCR MCP, Universal Crawler MCP, Flamehaven, Smart Cache, n8n KB
    recommendations: [
      {
        id: 'ai-rec-1',
        type: 'extension',
        title: 'MCP Server Marketplace',
        description: '만든 MCP 서버들을 패키징하여 npm 배포 또는 크몽에서 판매',
        relatedProjectIds: []
      },
      {
        id: 'ai-rec-2',
        type: 'integration',
        title: 'n8n MCP 통합',
        description: 'MCP 서버를 n8n 노드로 래핑하여 워크플로우에서 직접 사용 가능하게',
        relatedProjectIds: [4] // n8n Workflow 버전 관리
      },
      {
        id: 'ai-rec-3',
        type: 'extension',
        title: 'Claude Agent Marketplace',
        description: 'Cognitive Engines, Meta Prompt Generator 등을 Claude Agent로 패키징',
        relatedProjectIds: [1, 10]
      }
    ],
    actions: [
      {
        type: 'folder',
        label: '폴더 열기',
        path: 'C:\\Users\\user\\Desktop\\gpt'
      }
    ]
  },
  {
    id: 'automation-tools',
    name: 'Automation Tools',
    path: 'C:\\Users\\user\\Desktop\\gpt\\n8n-make\\automation',
    purpose: 'n8n 워크플로우 자동화, 배치 처리, 품질 검증 등 반복 작업 자동화',
    direction: 'n8n 중심 통합 자동화 → GUI 래퍼 제공 → 크몽 서비스화',
    projectIds: [4, 15, 18, 20, 26], // n8n Workflow, Market Crawler, Batch Processor, Quality Checker, Workflow Notes GUI
    recommendations: [
      {
        id: 'auto-rec-1',
        type: 'extension',
        title: 'n8n Workflow Templates',
        description: '자주 쓰는 워크플로우를 템플릿화하여 n8n 커뮤니티에 공유 또는 판매',
        relatedProjectIds: []
      },
      {
        id: 'auto-rec-2',
        type: 'integration',
        title: 'Market Analysis Dashboard',
        description: 'Market Crawler 결과를 실시간 대시보드로 시각화하여 크몽/프리랜서 시장 분석',
        relatedProjectIds: [15]
      }
    ],
    actions: [
      {
        type: 'gui',
        label: 'Workflow Notes GUI',
        path: 'C:\\Users\\user\\Desktop\\gpt\\n8n-make\\n8n\\workflow_notes_gui.py',
        command: 'python workflow_notes_gui.py'
      },
      {
        type: 'folder',
        label: '폴더 열기',
        path: 'C:\\Users\\user\\Desktop\\gpt\\n8n-make\\automation'
      }
    ]
  },
  {
    id: 'cognitive-engines',
    name: 'Cognitive Engines',
    path: 'C:\\Users\\user\\cognitive_engines',
    purpose: '전략적 사고를 지원하는 7개 사고 엔진 시스템 (제1원리, JTBD, VRIO 등)',
    direction: 'GUI 완성 → Claude Skill로 패키징 → 컨설팅 도구화',
    projectIds: [1], // Cognitive Engines GUI
    recommendations: [
      {
        id: 'cog-rec-1',
        type: 'extension',
        title: 'Claude Skill 패키징',
        description: 'Cognitive Engines를 Claude Code Skill로 패키징하여 배포',
        relatedProjectIds: []
      },
      {
        id: 'cog-rec-2',
        type: 'integration',
        title: 'RAG 의사결정 지원',
        description: 'RAG에서 나온 인사이트를 Cognitive Engines로 분석하여 의사결정 지원',
        relatedProjectIds: [2, 31]
      }
    ],
    actions: [
      {
        type: 'gui',
        label: 'Cognitive Engines GUI',
        path: 'C:\\Users\\user\\cognitive_engines\\gui_launcher.py',
        command: 'python gui_launcher.py'
      },
      {
        type: 'folder',
        label: '폴더 열기',
        path: 'C:\\Users\\user\\cognitive_engines'
      }
    ]
  }
];
