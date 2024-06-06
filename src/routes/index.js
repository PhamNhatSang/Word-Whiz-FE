import LoginPage from "../pages/LoginPage";
import RegisterPage from "../pages/RegisterPage";
import HomePage from "../pages/HomePage";
import DefaultLayout from "../layout/DefaultLayout";
import LibraryPage from "../pages/LibraryPage";
import GroupPage from "../pages/GroupPage";
import RankingPage from "../pages/RankingPage";
import CommunityPage from "../pages/CommunityPage";
import CourseDetailPage from "../pages/CourseDetailPage";
import GroupDetailPage from "../pages/GroupDetailPage";
import  FlashCardLearningPage  from "../pages/FlashCardLearningPage";
import TestPage from "../pages/TestPage";
import EditCourseDetailPage from "../pages/EditCourseDetailPage";
import ProtectedRoute from "./ProtectedRoute";

export const publicRoutes = [
    { path: '/', element: LoginPage },
    { path: '/signup', element: RegisterPage },
    { path: '/home', element: HomePage, layout: DefaultLayout,auth:ProtectedRoute },
    { path: '/library', element: LibraryPage, layout: DefaultLayout,auth:ProtectedRoute },
    { path: '/ranking', element: RankingPage, layout: DefaultLayout,auth:ProtectedRoute },
    { path: '/group', element: GroupPage, layout: DefaultLayout,auth:ProtectedRoute },
    { path: '/community', element: CommunityPage, layout: DefaultLayout,auth:ProtectedRoute },
    { path: '/library/course/:courseId', element: CourseDetailPage,layout: DefaultLayout,auth:ProtectedRoute},
    { path: '/group/:groupId', element: GroupDetailPage,layout: DefaultLayout,auth:ProtectedRoute},
    { path: '/library/course/:courseId/flashcard', element: FlashCardLearningPage,layout: DefaultLayout,auth:ProtectedRoute},
    { path: '/library/course/:courseId/test', element: TestPage,layout: DefaultLayout,auth:ProtectedRoute},
    { path: '/library/course/edit/:courseId', element: EditCourseDetailPage,layout: DefaultLayout,auth:ProtectedRoute},


];