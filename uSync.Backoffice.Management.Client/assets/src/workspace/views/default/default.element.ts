import { UmbElementMixin } from "@umbraco-cms/backoffice/element-api"
import { LitElement, css, customElement, html, nothing, state } from "@umbraco-cms/backoffice/external/lit";

import { USYNC_CORE_CONTEXT_TOKEN, uSyncWorkspaceContext } from '../../workspace.context.js';
import { SyncActionGroup, SyncHandlerSummary, uSyncActionView } from "../../../api/index.js";

@customElement('usync-default-view')
export class uSyncDefaultViewElement extends UmbElementMixin(LitElement) {

    #actionContext? : uSyncWorkspaceContext;
    #contextLoaded: Boolean = false; 

    @state()
    _actions?: Array<SyncActionGroup>

    @state()
    _workingActions? : Array<SyncHandlerSummary>;

    @state()
    _loaded: Boolean = false;

    @state()
    _working: boolean = false; 

    @state()
    _completed: boolean = false; 

    @state() 
    _showProgress: boolean = false;

    @state()
    _group?: SyncActionGroup 

    @state()
    _results: Array<uSyncActionView> = [];

    constructor() {
        super();
    }
  
    connectedCallback(): void {
        super.connectedCallback();
        this.#consumeContext();
    }

    #consumeContext() {

        this.consumeContext(USYNC_CORE_CONTEXT_TOKEN, (_instance) => {
            this.#actionContext = _instance;

            this.observe(_instance.actions, (_actions) => {
                this._actions = _actions;
                this._loaded = this._actions !== null;
            });

            this.observe(_instance.currentAction, (_currentAction) => {
                this._workingActions = _currentAction;
            });

            this.observe(_instance.working, (_working) => {
                this._working = _working;
            });

            this.observe(_instance.results, (_results) => {
                this._results = _results;
            })

            this.observe(_instance.completed, (_completed) => {
                this._completed = _completed;
            });

            this.observe(_instance.loaded, (_loaded) => {
                if (_loaded && this.#contextLoaded == false) {
                    this.#actionContext?.getActions();
                    this.#contextLoaded
                }
            })

        });
    }

    /**
     * @method performAction
     * @param {CustomEventInit} event 
     * @description do a thing, (report, import, export)
     */
    performAction(event: CustomEventInit) {
        this._showProgress = true;
        this._group = event.detail.group;
        this.#actionContext?.performAction(event.detail.group, event.detail.key);
    }

    render() {

        if (this._loaded == false) {
            return html`<uui-loader></uui-loader>`;
        }
        else {
            return html`
                <umb-body-layout>
                    ${this.#renderActions()}
                    ${this.#renderBanner()}
                    ${this.#renderProcessBox()}
                    ${this.#renderReport()}
                </umb-body-layout>
            `;
        }
    };

    #renderActions() {
        var actions = this._actions?.map((group) => {
            return html`
                <usync-action-box myName="fred"
                    .group="${group}"
                    @perform-action=${this.performAction}>
                </usync-action-box>
            `;
        })

        return html`
            <div class="action-buttons-box">
                ${actions}
            </div>
        `;
    }

    #renderBanner() {
        if (this._showProgress === true) return nothing;

        return html`
            <umb-empty-state>
                <h2>
                    <usync-icon-registry>
                        <uui-icon name="usync-logo"></uui-icon>
                    </usync-icon-registry>
                    <umb-localize key="uSync_banner"></umb-localize>
                </h2>
    
            </umb-empty-state>
        `;
    }

    #renderProcessBox() {
        if (this._showProgress == false) return nothing;

        return html`
            <usync-progress-box .title=${this._group?.groupName ?? 'doh!'}
                .actions=${this._workingActions}></usync-progress-box>
        `;
    }

    #renderReport() {
        if (this._completed == false) return nothing;

        return html`
            <uui-box>
                <usync-results .results=${this._results}></usync-results>
            </uui-box>
        `
    }

    static styles = [
        css`
            usync-action-box, uui-box {
               margin: var(--uui-size-space-4);
            }

            .action-buttons-box {
               display: grid;
               grid-template-columns: 1fr 1fr 1fr;
            }        

            umb-empty-state {
                position: absolute;
                top: 50%;
                transform: translateY(-50%);
                left: 0;
                right: 0;
                margin: 0 auto;
                text-align: center;
                color: #ddd;
                z-index: 0;
            }

            umb-empty-state h2 {
                font-size: 34pt;
            }

            umb-empty-state uui-icon {
                position: relative;
                top: 13px;
            }
        `
    ]
}

export default uSyncDefaultViewElement;

declare global {
    interface HTMLElementTagNameMap {
        'usync-default-view': uSyncDefaultViewElement
    }
}