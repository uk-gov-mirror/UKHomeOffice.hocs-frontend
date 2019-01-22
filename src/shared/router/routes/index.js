import ActionPage from '../../pages/action.jsx';
import CasePage from '../../pages/case.jsx';
import StagePage from '../../pages/stage.jsx';
import CaseSummaryPage from '../../pages/summary.jsx';
import Error from '../../layouts/error.jsx';
import MainPage from '../../pages/dashboard.jsx';
import WorkstackPage from '../../pages/workstack.jsx';

const routes = [
    {
        path: '/',
        exact: true,
        component: MainPage,
        title: 'Dashboard'
    },
    {
        path: '/action/:workflow/:action',
        exact: true,
        component: ActionPage
    },
    {
        path: '/action/:workflow/:context/:action',
        exact: true,
        component: ActionPage
    },
    {
        path: '/case/:caseId/summary',
        exact: true,
        component: CaseSummaryPage
    },
    {
        path: '/case/:caseId/stage/:stageId',
        exact: true,
        component: StagePage
    },
    {
        path: '/case/:caseId/stage/:stageId/allocate',
        exact: true,
        component: StagePage
    },
    {
        path: '/case/:caseId/stage/:stageId/entity/:entity/:action/',
        exact: true,
        component: CasePage
    },
    {
        path: '/case/:caseId/stage/:stageId/entity/:entity/:context/:action/',
        exact: true,
        component: CasePage
    },
    {
        path: '/workstack/user',
        exact: true,
        component: WorkstackPage,
        title: 'User Workstack'
    },
    {
        path: '/workstack/team/:teamId/',
        exact: true,
        component: WorkstackPage,
        title: 'Team Workstack'
    },
    {
        path: '/workstack/team/:teamId/workflow/:workflowId',
        exact: true,
        component: WorkstackPage,
        title: 'Workflow Workstack'
    },
    {
        path: '/workstack/team/:teamId/workflow/:workflowId/stage/:stagId',
        exact: true,
        component: WorkstackPage,
        title: 'Stage Workstack'
    },
    {
        path: '/error',
        component: Error,
        title: 'There is a problem with the service',
        body: ['Try again later.'],
        errorCode: 500
    },
    {
        component: Error,
        title: 'Not found',
        body: [
            'If you typed the web address, check it is correct.',
            'If you pasted the web address, check you copied the entire address.'
        ],
        errorCode: 404
    }
];

export default routes;