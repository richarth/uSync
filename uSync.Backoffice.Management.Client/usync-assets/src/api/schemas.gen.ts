// This file is auto-generated by @hey-api/openapi-ts

export const ChangeDetailTypeSchema = {
    enum: ['NoChange', 'Create', 'Update', 'Delete', 'Error', 'Warning'],
    type: 'string'
} as const;

export const ChangeTypeSchema = {
    enum: ['NoChange', 'Create', 'Import', 'Export', 'Update', 'Delete', 'WillChange', 'Information', 'Rolledback', 'Fail', 'ImportFail', 'Mismatch', 'ParentMissing', 'Hidden', 'Clean', 'Removed'],
    type: 'string'
} as const;

export const EventMessageTypeModelSchema = {
    enum: ['Default', 'Info', 'Error', 'Success', 'Warning'],
    type: 'string'
} as const;

export const HandlerSettingsSchema = {
    required: ['actions', 'createClean', 'enabled', 'failOnMissingParent', 'group', 'guidNames', 'settings', 'useFlatStructure'],
    type: 'object',
    properties: {
        enabled: {
            type: 'boolean',
            default: true
        },
        actions: {
            type: 'array',
            items: {
                type: 'string'
            }
        },
        useFlatStructure: {
            type: 'boolean',
            default: true
        },
        guidNames: {
            type: 'boolean',
            default: false
        },
        failOnMissingParent: {
            type: 'boolean',
            default: false
        },
        group: {
            type: 'string',
            default: ''
        },
        createClean: {
            type: 'boolean'
        },
        settings: {
            type: 'object',
            additionalProperties: {
                type: 'string'
            }
        }
    },
    additionalProperties: false
} as const;

export const HandlerStatusSchema = {
    enum: ['Pending', 'Processing', 'Complete', 'Error'],
    type: 'string'
} as const;

export const NotificationHeaderModelSchema = {
    required: ['category', 'message', 'type'],
    type: 'object',
    properties: {
        message: {
            type: 'string'
        },
        category: {
            type: 'string'
        },
        type: {
            '$ref': '#/components/schemas/EventMessageTypeModel'
        }
    },
    additionalProperties: false
} as const;

export const PerformActionRequestSchema = {
    required: ['action', 'requestId', 'stepNumber'],
    type: 'object',
    properties: {
        requestId: {
            type: 'string'
        },
        action: {
            type: 'string'
        },
        stepNumber: {
            type: 'integer',
            format: 'int32'
        },
        options: {
            oneOf: [
                {
                    '$ref': '#/components/schemas/uSyncOptions'
                }
            ],
            nullable: true
        }
    },
    additionalProperties: false
} as const;

export const PerformActionResponseSchema = {
    required: ['complete', 'requestId'],
    type: 'object',
    properties: {
        requestId: {
            type: 'string'
        },
        status: {
            type: 'array',
            items: {
                oneOf: [
                    {
                        '$ref': '#/components/schemas/SyncHandlerSummary'
                    }
                ]
            },
            nullable: true
        },
        actions: {
            type: 'array',
            items: {
                oneOf: [
                    {
                        '$ref': '#/components/schemas/uSyncActionView'
                    }
                ]
            },
            nullable: true
        },
        complete: {
            type: 'boolean'
        }
    },
    additionalProperties: false
} as const;

export const SyncActionButtonSchema = {
    required: ['children', 'clean', 'color', 'force', 'key', 'label', 'look'],
    type: 'object',
    properties: {
        key: {
            type: 'string'
        },
        label: {
            type: 'string'
        },
        look: {
            type: 'string'
        },
        color: {
            type: 'string'
        },
        force: {
            type: 'boolean'
        },
        clean: {
            type: 'boolean'
        },
        children: {
            type: 'array',
            items: {
                oneOf: [
                    {
                        '$ref': '#/components/schemas/SyncActionButton'
                    }
                ]
            }
        }
    },
    additionalProperties: false
} as const;

export const SyncActionGroupSchema = {
    required: ['buttons', 'groupName', 'icon', 'key'],
    type: 'object',
    properties: {
        key: {
            type: 'string'
        },
        icon: {
            type: 'string'
        },
        groupName: {
            type: 'string'
        },
        buttons: {
            type: 'array',
            items: {
                oneOf: [
                    {
                        '$ref': '#/components/schemas/SyncActionButton'
                    }
                ]
            }
        }
    },
    additionalProperties: false
} as const;

export const SyncHandlerSummarySchema = {
    required: ['changes', 'icon', 'inError', 'name', 'status'],
    type: 'object',
    properties: {
        icon: {
            type: 'string'
        },
        name: {
            type: 'string'
        },
        status: {
            '$ref': '#/components/schemas/HandlerStatus'
        },
        changes: {
            type: 'integer',
            format: 'int32'
        },
        inError: {
            type: 'boolean'
        }
    },
    additionalProperties: false
} as const;

export const SyncLegacyCheckResponseSchema = {
    required: ['hasLegacy', 'legacyTypes'],
    type: 'object',
    properties: {
        hasLegacy: {
            type: 'boolean'
        },
        legacyFolder: {
            type: 'string',
            nullable: true
        },
        legacyTypes: {
            type: 'array',
            items: {
                type: 'string'
            }
        }
    },
    additionalProperties: false
} as const;

export const uSyncActionViewSchema = {
    required: ['change', 'details', 'handler', 'itemType', 'key', 'name', 'success'],
    type: 'object',
    properties: {
        key: {
            type: 'string',
            format: 'uuid'
        },
        name: {
            type: 'string'
        },
        handler: {
            type: 'string'
        },
        itemType: {
            type: 'string'
        },
        change: {
            '$ref': '#/components/schemas/ChangeType'
        },
        success: {
            type: 'boolean'
        },
        details: {
            type: 'array',
            items: {
                oneOf: [
                    {
                        '$ref': '#/components/schemas/uSyncChange'
                    }
                ]
            }
        },
        message: {
            type: 'string',
            nullable: true
        }
    },
    additionalProperties: false
} as const;

export const uSyncAddonInfoSchema = {
    required: ['version'],
    type: 'object',
    properties: {
        version: {
            type: 'string'
        }
    },
    additionalProperties: false
} as const;

export const uSyncAddonSplashSchema = {
    type: 'object',
    additionalProperties: false
} as const;

export const uSyncChangeSchema = {
    required: ['change', 'name', 'newValue', 'oldValue', 'path', 'success'],
    type: 'object',
    properties: {
        success: {
            type: 'boolean'
        },
        name: {
            type: 'string'
        },
        path: {
            type: 'string'
        },
        oldValue: {
            type: 'string'
        },
        newValue: {
            type: 'string'
        },
        change: {
            '$ref': '#/components/schemas/ChangeDetailType'
        }
    },
    additionalProperties: false
} as const;

export const uSyncHandlerSetSettingsSchema = {
    required: ['disabledHandlers', 'enabled', 'handlerDefaults', 'handlerGroups', 'handlers', 'isSelectable'],
    type: 'object',
    properties: {
        enabled: {
            type: 'boolean',
            default: true
        },
        handlerGroups: {
            type: 'array',
            items: {
                type: 'string'
            }
        },
        disabledHandlers: {
            type: 'array',
            items: {
                type: 'string'
            }
        },
        handlerDefaults: {
            oneOf: [
                {
                    '$ref': '#/components/schemas/HandlerSettings'
                }
            ]
        },
        handlers: {
            type: 'object',
            additionalProperties: {
                oneOf: [
                    {
                        '$ref': '#/components/schemas/HandlerSettings'
                    }
                ]
            }
        },
        isSelectable: {
            type: 'boolean'
        }
    },
    additionalProperties: false
} as const;

export const uSyncOptionsSchema = {
    required: ['clean', 'clientId', 'force', 'group', 'set'],
    type: 'object',
    properties: {
        clientId: {
            type: 'string'
        },
        force: {
            type: 'boolean'
        },
        clean: {
            type: 'boolean'
        },
        group: {
            type: 'string'
        },
        set: {
            type: 'string'
        }
    },
    additionalProperties: false
} as const;

export const uSyncSettingsSchema = {
    required: ['addOnPing', 'backgroundNotifications', 'cacheFolderKeys', 'customMappings', 'defaultExtension', 'defaultSet', 'disableDashboard', 'disableNotificationSuppression', 'enableHistory', 'exportAtStartup', 'exportOnSave', 'failOnDuplicates', 'failOnMissingParent', 'firstBootGroup', 'folders', 'hideAddOns', 'importAtStartup', 'importOnFirstBoot', 'isRootSite', 'legacyFolder', 'lockRoot', 'lockRootTypes', 'rebuildCacheOnCompletion', 'reportDebug', 'rootFolder', 'showVersionCheckWarning', 'summaryDashboard', 'summaryLimit', 'uiEnabledGroups'],
    type: 'object',
    properties: {
        rootFolder: {
            type: 'string',
            default: 'uSync/v14/'
        },
        folders: {
            type: 'array',
            items: {
                type: 'string'
            },
            default: 'uSync/Root/, uSync/v14/'
        },
        legacyFolder: {
            type: 'string',
            default: 'uSync/v9'
        },
        isRootSite: {
            type: 'boolean',
            default: false
        },
        lockRoot: {
            type: 'boolean',
            default: true
        },
        lockRootTypes: {
            type: 'array',
            items: {
                type: 'string'
            }
        },
        defaultSet: {
            type: 'string',
            default: 'Default'
        },
        importAtStartup: {
            type: 'string',
            default: 'None'
        },
        exportAtStartup: {
            type: 'string',
            default: 'None'
        },
        exportOnSave: {
            type: 'string',
            default: 'All'
        },
        uiEnabledGroups: {
            type: 'string',
            default: 'All'
        },
        reportDebug: {
            type: 'boolean',
            default: false
        },
        addOnPing: {
            type: 'boolean',
            default: true
        },
        rebuildCacheOnCompletion: {
            type: 'boolean',
            default: false
        },
        failOnMissingParent: {
            type: 'boolean',
            default: false
        },
        failOnDuplicates: {
            type: 'boolean',
            default: false
        },
        cacheFolderKeys: {
            type: 'boolean',
            default: true
        },
        showVersionCheckWarning: {
            type: 'boolean',
            default: true
        },
        customMappings: {
            type: 'object',
            additionalProperties: {
                type: 'string'
            }
        },
        enableHistory: {
            type: 'boolean',
            default: true
        },
        defaultExtension: {
            type: 'string',
            default: 'config'
        },
        importOnFirstBoot: {
            type: 'boolean',
            default: false
        },
        firstBootGroup: {
            type: 'string',
            default: 'All'
        },
        disableDashboard: {
            type: 'boolean',
            default: 'false'
        },
        summaryDashboard: {
            type: 'boolean',
            default: 'false'
        },
        summaryLimit: {
            type: 'integer',
            format: 'int32',
            default: 1000
        },
        hideAddOns: {
            type: 'string'
        },
        disableNotificationSuppression: {
            type: 'boolean',
            default: 'true'
        },
        backgroundNotifications: {
            type: 'boolean',
            default: false
        }
    },
    additionalProperties: false
} as const;