import { apiClient } from "@/lib/apiClient";
import type {
  Project,
  ProjectCreateInput,
  ProjectsListParams,
  ProjectsListResponse,
  ApiResponse,
} from "@/types/project";

export const projectsService = {
  /**
   * Create a new project
   * POST /api/projects/
   */
  createProject: async (data: ProjectCreateInput): Promise<ApiResponse<{ project: Project }>> => {
    const res = await apiClient.post("/api/projects", data);
    return res.data;
  },

  /**
   * Get all projects with pagination
   * GET /api/projects
   */
  getProjects: async (params?: ProjectsListParams): Promise<ApiResponse<ProjectsListResponse>> => {
    const res = await apiClient.get("/api/projects", { params });
    return res.data;
  },

  /**
   * Get a single project by ID
   * GET /api/projects/:id
   */
  getProjectById: async (id: string): Promise<ApiResponse<{ project: Project }>> => {
    const res = await apiClient.get(`/api/projects/${id}`);
    return res.data;
  },
};
