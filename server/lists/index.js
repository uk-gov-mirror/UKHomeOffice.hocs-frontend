const { caseworkService, infoService, workflowService } = require('../clients/index');
const listService = require('../services/list');
const statics = require('./adapters/statics');
const caseTypeAdapter = require('./adapters/case-types');
const caseTypeCommaSeparatedAdapter = require('./adapters/case-types-comma-separated');
const workstack = require('./adapters/workstacks');
const topicAdapter = require('./adapters/topics');
const usersAdapter = require('./adapters/users');
const teamsAdapter = require('./adapters/teams');
const entityListItemsAdapter = require('./adapters/entityListItems');
const templatesAdapter = require('./adapters/templates');
const membersAdapter = require('./adapters/members');
const documentsAdapter = require('./adapters/documents');
const documentListAdapter = require('./adapters/documentList');
const documentTagsAdapter = require('./adapters/documentTags');
const countrySortAdapter = require('./adapters/countrySort');
const caseNoteAdapter = require('./adapters/case-notes');
const caseSummaryAdapter = require('./adapters/case-summary');
const caseViewAllStagesAdapter = require('./adapters/case-view-all-stages');
const caseViewReadOnlyAdapter = require('./adapters/case-view-read-only');
const {
    caseCorrespondentAdapter,
    correspondentTypeAdapter,
    caseCorrespondentsAllAdapter
} = require('./adapters/correspondents');
const { somuTypesAdapter, somuItemsAdapter } = require('./adapters/somu');

module.exports = {
    lists: {
        S_TEAMS: {
            client: 'INFO',
            endpoint: '/team',
            type: listService.types.STATIC,
            adapter: statics.teamsAdapter
        },
        S_USERS: {
            client: 'INFO',
            endpoint: '/users',
            type: listService.types.STATIC,
            adapter: statics.usersAdapter
        },
        S_CASETYPES: {
            client: 'INFO',
            endpoint: '/caseType',
            type: listService.types.STATIC,
            adapter: statics.caseTypesAdapter
        },
        S_STAGETYPES: {
            client: 'INFO',
            endpoint: '/stageType',
            type: listService.types.STATIC,
            adapter: statics.stageTypesAdapter
        },
        S_SYSTEM_CONFIGURATION: {
            client: 'INFO',
            endpoint: '/configuration',
            type: listService.types.STATIC
        },
        S_WCS_COHORTS: {
            client: 'INFO',
            endpoint: '/entity/list/WCS_COHORTS',
            type: listService.types.STATIC,
            adapter: entityListItemsAdapter
        },
        S_WCS_I_STATUS: {
            client: 'INFO',
            endpoint: '/entity/list/WCS_I_STATUS',
            type: listService.types.STATIC,
            adapter: entityListItemsAdapter
        },
        S_WCS_I_STATUS_OUTCOME: {
            client: 'INFO',
            endpoint: '/entity/list/WCS_I_STATUS_OUTCOME',
            type: listService.types.STATIC,
            adapter: entityListItemsAdapter
        },
        S_WCS_ELIG_REJ_REASON: {
            client: 'INFO',
            endpoint: '/entity/list/WCS_ELIG_REJ_REASON',
            type: listService.types.STATIC,
            adapter: entityListItemsAdapter
        },
        S_MPAM_ENQUIRY_SUBJECTS: {
            client: 'INFO',
            endpoint: '/entity/list/MPAM_ENQUIRY_SUBJECTS',
            type: listService.types.STATIC,
            adapter: entityListItemsAdapter
        },
        S_MPAM_ENQUIRY_REASONS_ALL: {
            client: 'INFO',
            endpoint: '/entity/list/MPAM_ENQUIRY_REASONS_ALL',
            type: listService.types.STATIC,
            adapter: entityListItemsAdapter
        },
        S_MPAM_ENQUIRY_REASONS_PER: {
            client: 'INFO',
            endpoint: '/entity/list/MPAM_ENQUIRY_REASONS_PER',
            type: listService.types.STATIC,
            adapter: entityListItemsAdapter
        },
        S_MPAM_ENQUIRY_REASONS_GUI: {
            client: 'INFO',
            endpoint: '/entity/list/MPAM_ENQUIRY_REASONS_GUI',
            type: listService.types.STATIC,
            adapter: entityListItemsAdapter
        },
        S_MPAM_ENQUIRY_REASONS_DOC: {
            client: 'INFO',
            endpoint: '/entity/list/MPAM_ENQUIRY_REASONS_DOC',
            type: listService.types.STATIC,
            adapter: entityListItemsAdapter
        },
        S_MPAM_ENQUIRY_REASONS_TECH: {
            client: 'INFO',
            endpoint: '/entity/list/MPAM_ENQUIRY_REASONS_TECH',
            type: listService.types.STATIC,
            adapter: entityListItemsAdapter
        },
        S_MPAM_ENQUIRY_REASONS_DET: {
            client: 'INFO',
            endpoint: '/entity/list/MPAM_ENQUIRY_REASONS_DET',
            type: listService.types.STATIC,
            adapter: entityListItemsAdapter
        },
        S_MPAM_ENQUIRY_REASONS_HMPO: {
            client: 'INFO',
            endpoint: '/entity/list/MPAM_ENQUIRY_REASONS_HMPO',
            type: listService.types.STATIC,
            adapter: entityListItemsAdapter
        },
        S_MPAM_ENQUIRY_REASONS_OTHER: {
            client: 'INFO',
            endpoint: '/entity/list/MPAM_ENQUIRY_REASONS_OTHER',
            type: listService.types.STATIC,
            adapter: entityListItemsAdapter
        },
        S_MPAM_BUS_UNITS_ALL: {
            client: 'INFO',
            endpoint: '/entity/list/MPAM_BUS_UNITS_ALL',
            type: listService.types.STATIC,
            adapter: entityListItemsAdapter
        },
        S_MPAM_BUS_UNITS_1: {
            client: 'INFO',
            endpoint: '/entity/list/MPAM_BUS_UNITS_1',
            type: listService.types.STATIC,
            adapter: entityListItemsAdapter
        },
        S_MPAM_BUS_UNITS_2: {
            client: 'INFO',
            endpoint: '/entity/list/MPAM_BUS_UNITS_2',
            type: listService.types.STATIC,
            adapter: entityListItemsAdapter
        },
        S_MPAM_BUS_UNITS_3: {
            client: 'INFO',
            endpoint: '/entity/list/MPAM_BUS_UNITS_3',
            type: listService.types.STATIC,
            adapter: entityListItemsAdapter
        },
        S_MPAM_BUS_UNITS_4: {
            client: 'INFO',
            endpoint: '/entity/list/MPAM_BUS_UNITS_4',
            type: listService.types.STATIC,
            adapter: entityListItemsAdapter
        },
        S_MPAM_BUS_UNITS_5: {
            client: 'INFO',
            endpoint: '/entity/list/MPAM_BUS_UNITS_5',
            type: listService.types.STATIC,
            adapter: entityListItemsAdapter
        },
        S_MPAM_BUS_UNITS_6: {
            client: 'INFO',
            endpoint: '/entity/list/MPAM_BUS_UNITS_6',
            type: listService.types.STATIC,
            adapter: entityListItemsAdapter
        },
        S_MPAM_BUS_UNITS_7: {
            client: 'INFO',
            endpoint: '/entity/list/MPAM_BUS_UNITS_7',
            type: listService.types.STATIC,
            adapter: entityListItemsAdapter
        },
        S_MPAM_CAMPAIGNS: {
            client: 'INFO',
            endpoint: '/entity/list/MPAM_CAMPAIGNS',
            type: listService.types.STATIC,
            adapter: entityListItemsAdapter
        },
        S_MPAM_MIN_SIGN_OFF_TEAMS: {
            client: 'INFO',
            endpoint: '/entity/list/MPAM_MIN_SIGN_OFF_TEAMS',
            type: listService.types.STATIC,
            adapter: entityListItemsAdapter
        },
        MPAM_CAMPAIGNS: {
            client: 'INFO',
            endpoint: '/entity/list/MPAM_CAMPAIGNS',
            adapter: entityListItemsAdapter
        },
        CASE_TYPES: {
            client: 'INFO',
            endpoint: '/caseType?bulkOnly=false',
            adapter: caseTypeAdapter
        },
        CASE_TYPES_BULK: {
            client: 'INFO',
            endpoint: '/caseType?bulkOnly=true',
            adapter: caseTypeAdapter
        },
        CASE_TYPES_COMMA_SEPARATED: {
            client: 'INFO',
            endpoint: '/caseType?bulkOnly=false',
            adapter: caseTypeCommaSeparatedAdapter
        },
        COUNTRIES_CURRENT: {
            client: 'INFO',
            endpoint: '/country',
            adapter: countrySortAdapter
        },
        DASHBOARD: {
            client: 'CASEWORK',
            endpoint: '/stage',
            adapter: workstack.dashboardAdapter
        },
        USER_WORKSTACK: {
            client: 'CASEWORK',
            endpoint: '/stage',
            adapter: workstack.userAdapter
        },
        TEAM_WORKSTACK: {
            client: 'CASEWORK',
            endpoint: '/stage/team/${teamId}',
            adapter: workstack.teamAdapter
        },
        WCS_CASEWORK_TEAMS: {
            client: 'INFO',
            endpoint: '/teams?unit=WCS_CASEWORK_TEAMS',
            adapter: teamsAdapter
        },
        WORKFLOW_WORKSTACK: {
            client: 'CASEWORK',
            endpoint: '/stage',
            adapter: workstack.workflowAdapter
        },
        STAGE_WORKSTACK: {
            client: 'CASEWORK',
            endpoint: '/stage',
            adapter: workstack.stageAdapter
        },
        DRAFT_TEAMS: {
            client: 'INFO',
            endpoint: '/teams/drafters',
            adapter: teamsAdapter
        },
        PRIVATE_OFFICE_TEAMS: {
            client: 'INFO',
            endpoint: '/teams?unit=PRIVATE_OFFICE',
            adapter: teamsAdapter
        },
        MOVE_TEAM_OPTIONS: {
            client: 'INFO',
            endpoint: '/team/${teamId}/move_options',
            adapter: teamsAdapter
        },
        USERS_FOR_CASE: {
            client: 'CASEWORK',
            endpoint: '/case/${caseId}/stage/${stageId}/team/members',
            adapter: usersAdapter
        },
        USERS_IN_TEAM: {
            client: 'INFO',
            endpoint: '/teams/${teamId}/members',
            adapter: usersAdapter
        },
        CASE_CORRESPONDENTS_ALL: {
            client: 'CASEWORK',
            endpoint: '/case/${caseId}/correspondent',
            adapter: caseCorrespondentsAllAdapter
        },
        CASE_CORRESPONDENTS: {
            client: 'CASEWORK',
            endpoint: '/case/${caseId}/correspondent',
            adapter: caseCorrespondentAdapter
        },
        CORRESPONDENT_TYPES: {
            client: 'CASEWORK',
            endpoint: '/case/${caseId}/correspondentType',
            adapter: correspondentTypeAdapter
        },
        SELECTABLE_CORRESPONDENT_TYPES: {
            client: 'CASEWORK',
            endpoint: '/case/${caseId}/correspondentType/selectable',
            adapter: correspondentTypeAdapter
        },
        TOPICS: {
            client: 'INFO',
            endpoint: '/topics',
            type: listService.types.DYNAMIC,
        },
        TOPICS_USER: {
            client: 'INFO',
            endpoint: '/topics/MIN',
            adapter: topicAdapter
        },
        TOPICS_CASETYPE: {
            client: 'INFO',
            endpoint: '/case/${caseId}/topiclist',
            type: listService.types.DYNAMIC,
            adapter: topicAdapter
        },
        CASE_TOPICS: {
            client: 'CASEWORK',
            endpoint: '/case/${caseId}/topic',
            adapter: (data) => data.topics
        },
        CASE_TEMPLATES: {
            client: 'CASEWORK',
            endpoint: '/case/${caseId}/templates',
            adapter: templatesAdapter,
            defaultValue: []
        },
        CASE_STANDARD_LINES: {
            client: 'CASEWORK',
            endpoint: '/case/${caseId}/standardLine',
            adapter: templatesAdapter,
            defaultValue: []
        },
        MEMBER_LIST: {
            client: 'INFO',
            endpoint: '/member',
            adapter: membersAdapter
        },
        CASE_DOCUMENT_LIST: {
            client: 'CASEWORK',
            endpoint: '/case/document/reference/${caseId}',
            adapter: documentsAdapter
        },
        CASE_DOCUMENT_LIST_FINAL: {
            client: 'CASEWORK',
            endpoint: '/case/document/reference/${caseId}/?type=FINAL',
            adapter: documentListAdapter
        },
        CASE_DOCUMENT_LIST_DRAFT: {
            client: 'CASEWORK',
            endpoint: '/case/document/reference/${caseId}/?type=DRAFT',
            adapter: documentListAdapter
        },
        CASE_DOCUMENT_TAGS: {
            client: 'CASEWORK',
            endpoint: '/case/${caseId}/documentTags',
            adapter: documentTagsAdapter
        },
        CASE_NOTES: {
            client: 'CASEWORK',
            endpoint: '/case/${caseId}/timeline',
            adapter: caseNoteAdapter
        },
        CASE_SUMMARY: {
            client: 'CASEWORK',
            endpoint: '/case/${caseId}/summary',
            adapter: caseSummaryAdapter
        },
        CASE_VIEW_ALL_STAGES: {
            client: 'WORKFLOW',
            endpoint: '/case/${caseId}',
            adapter: caseViewAllStagesAdapter
        },
        CASE_VIEW_READ_ONLY: {
            client: 'WORKFLOW',
            endpoint: '/case/details/${caseId}',
            adapter: caseViewReadOnlyAdapter
        },
        DCU_POLICY_TEAM_FOR_TOPIC: {
            client: 'INFO',
            endpoint: '/team/topic/stage/DCU_DTEN_INITIAL_DRAFT',
            type: listService.types.DYNAMIC,
        },
        SOMU_TYPES: {
            client: 'INFO',
            endpoint: '/somuType',
            type: listService.types.STATIC,
            adapter: somuTypesAdapter
        },
        CASE_SOMU_ITEM: {
            client: 'CASEWORK',
            endpoint: '/case/${caseId}/item/${somuTypeId}',
            type: listService.types.DYNAMIC,
            adapter: somuItemsAdapter
        },
    },
    clients: {
        CASEWORK: caseworkService,
        WORKFLOW: workflowService,
        INFO: infoService
    }
};
