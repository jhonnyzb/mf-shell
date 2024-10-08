'use strict';

customElements.define('compodoc-menu', class extends HTMLElement {
    constructor() {
        super();
        this.isNormalMode = this.getAttribute('mode') === 'normal';
    }

    connectedCallback() {
        this.render(this.isNormalMode);
    }

    render(isNormalMode) {
        let tp = lithtml.html(`
        <nav>
            <ul class="list">
                <li class="title">
                    <a href="index.html" data-type="index-link">wr-shell documentation</a>
                </li>

                <li class="divider"></li>
                ${ isNormalMode ? `<div id="book-search-input" role="search"><input type="text" placeholder="Type to search"></div>` : '' }
                <li class="chapter">
                    <a data-type="chapter-link" href="index.html"><span class="icon ion-ios-home"></span>Getting started</a>
                    <ul class="links">
                        <li class="link">
                            <a href="overview.html" data-type="chapter-link">
                                <span class="icon ion-ios-keypad"></span>Overview
                            </a>
                        </li>
                        <li class="link">
                            <a href="index.html" data-type="chapter-link">
                                <span class="icon ion-ios-paper"></span>README
                            </a>
                        </li>
                                <li class="link">
                                    <a href="dependencies.html" data-type="chapter-link">
                                        <span class="icon ion-ios-list"></span>Dependencies
                                    </a>
                                </li>
                                <li class="link">
                                    <a href="properties.html" data-type="chapter-link">
                                        <span class="icon ion-ios-apps"></span>Properties
                                    </a>
                                </li>
                    </ul>
                </li>
                    <li class="chapter modules">
                        <a data-type="chapter-link" href="modules.html">
                            <div class="menu-toggler linked" data-bs-toggle="collapse" ${ isNormalMode ?
                                'data-bs-target="#modules-links"' : 'data-bs-target="#xs-modules-links"' }>
                                <span class="icon ion-ios-archive"></span>
                                <span class="link-name">Modules</span>
                                <span class="icon ion-ios-arrow-down"></span>
                            </div>
                        </a>
                        <ul class="links collapse " ${ isNormalMode ? 'id="modules-links"' : 'id="xs-modules-links"' }>
                            <li class="link">
                                <a href="modules/AppModule.html" data-type="entity-link" >AppModule</a>
                                    <li class="chapter inner">
                                        <div class="simple menu-toggler" data-bs-toggle="collapse" ${ isNormalMode ?
                                            'data-bs-target="#components-links-module-AppModule-936f7a43247b16b25d456aa2f7df3c74d046d471a65dbc10b88c775bfc45e75da6f7f7e7268f796c052fb494114b2c48d67b554560e600ff8f1b1c4c82be7d87"' : 'data-bs-target="#xs-components-links-module-AppModule-936f7a43247b16b25d456aa2f7df3c74d046d471a65dbc10b88c775bfc45e75da6f7f7e7268f796c052fb494114b2c48d67b554560e600ff8f1b1c4c82be7d87"' }>
                                            <span class="icon ion-md-cog"></span>
                                            <span>Components</span>
                                            <span class="icon ion-ios-arrow-down"></span>
                                        </div>
                                        <ul class="links collapse" ${ isNormalMode ? 'id="components-links-module-AppModule-936f7a43247b16b25d456aa2f7df3c74d046d471a65dbc10b88c775bfc45e75da6f7f7e7268f796c052fb494114b2c48d67b554560e600ff8f1b1c4c82be7d87"' :
                                            'id="xs-components-links-module-AppModule-936f7a43247b16b25d456aa2f7df3c74d046d471a65dbc10b88c775bfc45e75da6f7f7e7268f796c052fb494114b2c48d67b554560e600ff8f1b1c4c82be7d87"' }>
                                            <li class="link">
                                                <a href="components/AppComponent.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >AppComponent</a>
                                            </li>
                                        </ul>
                                    </li>
                            </li>
                            <li class="link">
                                <a href="modules/AppRoutingModule.html" data-type="entity-link" >AppRoutingModule</a>
                            </li>
                            <li class="link">
                                <a href="modules/ChildRoutesModule.html" data-type="entity-link" >ChildRoutesModule</a>
                            </li>
                            <li class="link">
                                <a href="modules/MainModule.html" data-type="entity-link" >MainModule</a>
                                    <li class="chapter inner">
                                        <div class="simple menu-toggler" data-bs-toggle="collapse" ${ isNormalMode ?
                                            'data-bs-target="#components-links-module-MainModule-1d17e9f51194580fdc964115a626d49077266e6600b4a267ed4e0ecab8059f0d037534f870d3d1df73edb6e0b38b19939c52a567a4167ff81cf88a9c9868cb16"' : 'data-bs-target="#xs-components-links-module-MainModule-1d17e9f51194580fdc964115a626d49077266e6600b4a267ed4e0ecab8059f0d037534f870d3d1df73edb6e0b38b19939c52a567a4167ff81cf88a9c9868cb16"' }>
                                            <span class="icon ion-md-cog"></span>
                                            <span>Components</span>
                                            <span class="icon ion-ios-arrow-down"></span>
                                        </div>
                                        <ul class="links collapse" ${ isNormalMode ? 'id="components-links-module-MainModule-1d17e9f51194580fdc964115a626d49077266e6600b4a267ed4e0ecab8059f0d037534f870d3d1df73edb6e0b38b19939c52a567a4167ff81cf88a9c9868cb16"' :
                                            'id="xs-components-links-module-MainModule-1d17e9f51194580fdc964115a626d49077266e6600b4a267ed4e0ecab8059f0d037534f870d3d1df73edb6e0b38b19939c52a567a4167ff81cf88a9c9868cb16"' }>
                                            <li class="link">
                                                <a href="components/MainComponent.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >MainComponent</a>
                                            </li>
                                        </ul>
                                    </li>
                            </li>
                            <li class="link">
                                <a href="modules/MainRoutingModule.html" data-type="entity-link" >MainRoutingModule</a>
                            </li>
                            <li class="link">
                                <a href="modules/MixpayResponseModule.html" data-type="entity-link" >MixpayResponseModule</a>
                                    <li class="chapter inner">
                                        <div class="simple menu-toggler" data-bs-toggle="collapse" ${ isNormalMode ?
                                            'data-bs-target="#components-links-module-MixpayResponseModule-84d594ad0bf43204be88fc48420ac897d66bd98e17a9a9f49206b69e25d7929a8171b6b556f5eab90e7f8c6ff0ce70ac94e720bb9a06e1c9af278afbe81e2e9e"' : 'data-bs-target="#xs-components-links-module-MixpayResponseModule-84d594ad0bf43204be88fc48420ac897d66bd98e17a9a9f49206b69e25d7929a8171b6b556f5eab90e7f8c6ff0ce70ac94e720bb9a06e1c9af278afbe81e2e9e"' }>
                                            <span class="icon ion-md-cog"></span>
                                            <span>Components</span>
                                            <span class="icon ion-ios-arrow-down"></span>
                                        </div>
                                        <ul class="links collapse" ${ isNormalMode ? 'id="components-links-module-MixpayResponseModule-84d594ad0bf43204be88fc48420ac897d66bd98e17a9a9f49206b69e25d7929a8171b6b556f5eab90e7f8c6ff0ce70ac94e720bb9a06e1c9af278afbe81e2e9e"' :
                                            'id="xs-components-links-module-MixpayResponseModule-84d594ad0bf43204be88fc48420ac897d66bd98e17a9a9f49206b69e25d7929a8171b6b556f5eab90e7f8c6ff0ce70ac94e720bb9a06e1c9af278afbe81e2e9e"' }>
                                            <li class="link">
                                                <a href="components/MixpayResponseComponent.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >MixpayResponseComponent</a>
                                            </li>
                                        </ul>
                                    </li>
                            </li>
                            <li class="link">
                                <a href="modules/PagesModule.html" data-type="entity-link" >PagesModule</a>
                                    <li class="chapter inner">
                                        <div class="simple menu-toggler" data-bs-toggle="collapse" ${ isNormalMode ?
                                            'data-bs-target="#components-links-module-PagesModule-8757917040f012faa02abd225bb14a015cd69df953d55eb2d405297b26374ffe488b4496c117135772b13d4534b2d3e4437eed96bc86c784767641c590a697dd"' : 'data-bs-target="#xs-components-links-module-PagesModule-8757917040f012faa02abd225bb14a015cd69df953d55eb2d405297b26374ffe488b4496c117135772b13d4534b2d3e4437eed96bc86c784767641c590a697dd"' }>
                                            <span class="icon ion-md-cog"></span>
                                            <span>Components</span>
                                            <span class="icon ion-ios-arrow-down"></span>
                                        </div>
                                        <ul class="links collapse" ${ isNormalMode ? 'id="components-links-module-PagesModule-8757917040f012faa02abd225bb14a015cd69df953d55eb2d405297b26374ffe488b4496c117135772b13d4534b2d3e4437eed96bc86c784767641c590a697dd"' :
                                            'id="xs-components-links-module-PagesModule-8757917040f012faa02abd225bb14a015cd69df953d55eb2d405297b26374ffe488b4496c117135772b13d4534b2d3e4437eed96bc86c784767641c590a697dd"' }>
                                            <li class="link">
                                                <a href="components/PagesComponent.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >PagesComponent</a>
                                            </li>
                                        </ul>
                                    </li>
                            </li>
                            <li class="link">
                                <a href="modules/PagesRoutingModule.html" data-type="entity-link" >PagesRoutingModule</a>
                            </li>
                            <li class="link">
                                <a href="modules/SharedModule.html" data-type="entity-link" >SharedModule</a>
                                    <li class="chapter inner">
                                        <div class="simple menu-toggler" data-bs-toggle="collapse" ${ isNormalMode ?
                                            'data-bs-target="#components-links-module-SharedModule-b03f0233ed84c2974c6052e0a29a96068e2ad72184a1319ee138ea93f6fc179f70b9c7148ac6a6e4322a03fad9e9e200ae9af2ca2065d67dfd0c33c00eaba1aa"' : 'data-bs-target="#xs-components-links-module-SharedModule-b03f0233ed84c2974c6052e0a29a96068e2ad72184a1319ee138ea93f6fc179f70b9c7148ac6a6e4322a03fad9e9e200ae9af2ca2065d67dfd0c33c00eaba1aa"' }>
                                            <span class="icon ion-md-cog"></span>
                                            <span>Components</span>
                                            <span class="icon ion-ios-arrow-down"></span>
                                        </div>
                                        <ul class="links collapse" ${ isNormalMode ? 'id="components-links-module-SharedModule-b03f0233ed84c2974c6052e0a29a96068e2ad72184a1319ee138ea93f6fc179f70b9c7148ac6a6e4322a03fad9e9e200ae9af2ca2065d67dfd0c33c00eaba1aa"' :
                                            'id="xs-components-links-module-SharedModule-b03f0233ed84c2974c6052e0a29a96068e2ad72184a1319ee138ea93f6fc179f70b9c7148ac6a6e4322a03fad9e9e200ae9af2ca2065d67dfd0c33c00eaba1aa"' }>
                                            <li class="link">
                                                <a href="components/BannerComponent.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >BannerComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/FeatureArticlesComponent.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >FeatureArticlesComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/FooterComponent.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >FooterComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/MatCloseSessionDialogComponent.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >MatCloseSessionDialogComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/MatConfirmAwardComponent.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >MatConfirmAwardComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/MatConfirmDialogComponent.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >MatConfirmDialogComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/MatFormNequiDaviplataComponent.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >MatFormNequiDaviplataComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/MatFormProductComponent.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >MatFormProductComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/MenuProfileComponent.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >MenuProfileComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/NewsComponent.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >NewsComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/PolicyAcceptanceDialogComponent.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >PolicyAcceptanceDialogComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/PopupInformationComponent.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >PopupInformationComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/SpinnerComponent.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >SpinnerComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/TopbarComponent.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >TopbarComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/WidgetsComponent.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >WidgetsComponent</a>
                                            </li>
                                        </ul>
                                    </li>
                            </li>
                            <li class="link">
                                <a href="modules/UiModule.html" data-type="entity-link" >UiModule</a>
                            </li>
                </ul>
                </li>
                    <li class="chapter">
                        <div class="simple menu-toggler" data-bs-toggle="collapse" ${ isNormalMode ? 'data-bs-target="#classes-links"' :
                            'data-bs-target="#xs-classes-links"' }>
                            <span class="icon ion-ios-paper"></span>
                            <span>Classes</span>
                            <span class="icon ion-ios-arrow-down"></span>
                        </div>
                        <ul class="links collapse " ${ isNormalMode ? 'id="classes-links"' : 'id="xs-classes-links"' }>
                            <li class="link">
                                <a href="classes/AccountResponseModel.html" data-type="entity-link" >AccountResponseModel</a>
                            </li>
                            <li class="link">
                                <a href="classes/AffiliationResponseModel.html" data-type="entity-link" >AffiliationResponseModel</a>
                            </li>
                            <li class="link">
                                <a href="classes/BoardEntityModel.html" data-type="entity-link" >BoardEntityModel</a>
                            </li>
                            <li class="link">
                                <a href="classes/BoardsMapper.html" data-type="entity-link" >BoardsMapper</a>
                            </li>
                            <li class="link">
                                <a href="classes/CartModel.html" data-type="entity-link" >CartModel</a>
                            </li>
                            <li class="link">
                                <a href="classes/CategoryMapper.html" data-type="entity-link" >CategoryMapper</a>
                            </li>
                            <li class="link">
                                <a href="classes/CategoryModel.html" data-type="entity-link" >CategoryModel</a>
                            </li>
                            <li class="link">
                                <a href="classes/CategoryRepository.html" data-type="entity-link" >CategoryRepository</a>
                            </li>
                            <li class="link">
                                <a href="classes/DialogParams.html" data-type="entity-link" >DialogParams</a>
                            </li>
                            <li class="link">
                                <a href="classes/DialogParams-1.html" data-type="entity-link" >DialogParams</a>
                            </li>
                            <li class="link">
                                <a href="classes/DialogParamsAward.html" data-type="entity-link" >DialogParamsAward</a>
                            </li>
                            <li class="link">
                                <a href="classes/ErrorResponseModel.html" data-type="entity-link" >ErrorResponseModel</a>
                            </li>
                            <li class="link">
                                <a href="classes/FastMenuItemModel.html" data-type="entity-link" >FastMenuItemModel</a>
                            </li>
                            <li class="link">
                                <a href="classes/FastMenuListResponseModel.html" data-type="entity-link" >FastMenuListResponseModel</a>
                            </li>
                            <li class="link">
                                <a href="classes/FeatureProductsModelResponse.html" data-type="entity-link" >FeatureProductsModelResponse</a>
                            </li>
                            <li class="link">
                                <a href="classes/FilterProductsModel.html" data-type="entity-link" >FilterProductsModel</a>
                            </li>
                            <li class="link">
                                <a href="classes/FooterProgramsModel.html" data-type="entity-link" >FooterProgramsModel</a>
                            </li>
                            <li class="link">
                                <a href="classes/FooterResponseModel.html" data-type="entity-link" >FooterResponseModel</a>
                            </li>
                            <li class="link">
                                <a href="classes/FormValidators.html" data-type="entity-link" >FormValidators</a>
                            </li>
                            <li class="link">
                                <a href="classes/GetQuickMenuModel.html" data-type="entity-link" >GetQuickMenuModel</a>
                            </li>
                            <li class="link">
                                <a href="classes/GtmDispatchEventsRepository.html" data-type="entity-link" >GtmDispatchEventsRepository</a>
                            </li>
                            <li class="link">
                                <a href="classes/GtmEventsRepository.html" data-type="entity-link" >GtmEventsRepository</a>
                            </li>
                            <li class="link">
                                <a href="classes/GTMItemOfSelectItem.html" data-type="entity-link" >GTMItemOfSelectItem</a>
                            </li>
                            <li class="link">
                                <a href="classes/GTMSelectContent.html" data-type="entity-link" >GTMSelectContent</a>
                            </li>
                            <li class="link">
                                <a href="classes/GTMSelectItem.html" data-type="entity-link" >GTMSelectItem</a>
                            </li>
                            <li class="link">
                                <a href="classes/InactivityRepository.html" data-type="entity-link" >InactivityRepository</a>
                            </li>
                            <li class="link">
                                <a href="classes/ListBoardsRequestModel.html" data-type="entity-link" >ListBoardsRequestModel</a>
                            </li>
                            <li class="link">
                                <a href="classes/ListBoardsResponseModel.html" data-type="entity-link" >ListBoardsResponseModel</a>
                            </li>
                            <li class="link">
                                <a href="classes/LoginValeproResponseModel.html" data-type="entity-link" >LoginValeproResponseModel</a>
                            </li>
                            <li class="link">
                                <a href="classes/LookAndFeelMapper.html" data-type="entity-link" >LookAndFeelMapper</a>
                            </li>
                            <li class="link">
                                <a href="classes/LookAndFeelModel.html" data-type="entity-link" >LookAndFeelModel</a>
                            </li>
                            <li class="link">
                                <a href="classes/LookAndFeelRepository.html" data-type="entity-link" >LookAndFeelRepository</a>
                            </li>
                            <li class="link">
                                <a href="classes/PaginationModel.html" data-type="entity-link" >PaginationModel</a>
                            </li>
                            <li class="link">
                                <a href="classes/PaymentModelResponse.html" data-type="entity-link" >PaymentModelResponse</a>
                            </li>
                            <li class="link">
                                <a href="classes/PersonDataResponseModel.html" data-type="entity-link" >PersonDataResponseModel</a>
                            </li>
                            <li class="link">
                                <a href="classes/PersonResponseModel.html" data-type="entity-link" >PersonResponseModel</a>
                            </li>
                            <li class="link">
                                <a href="classes/PolicyAcceptanceRequestDto.html" data-type="entity-link" >PolicyAcceptanceRequestDto</a>
                            </li>
                            <li class="link">
                                <a href="classes/PolicyAcceptanceRequestModel.html" data-type="entity-link" >PolicyAcceptanceRequestModel</a>
                            </li>
                            <li class="link">
                                <a href="classes/PolicyConfigFormMapper.html" data-type="entity-link" >PolicyConfigFormMapper</a>
                            </li>
                            <li class="link">
                                <a href="classes/PolicyRepository.html" data-type="entity-link" >PolicyRepository</a>
                            </li>
                            <li class="link">
                                <a href="classes/ProductCharacteristicModel.html" data-type="entity-link" >ProductCharacteristicModel</a>
                            </li>
                            <li class="link">
                                <a href="classes/ProductDetailByIdModel.html" data-type="entity-link" >ProductDetailByIdModel</a>
                            </li>
                            <li class="link">
                                <a href="classes/ProductDetailModel.html" data-type="entity-link" >ProductDetailModel</a>
                            </li>
                            <li class="link">
                                <a href="classes/ProductImageModel.html" data-type="entity-link" >ProductImageModel</a>
                            </li>
                            <li class="link">
                                <a href="classes/ProductInfo.html" data-type="entity-link" >ProductInfo</a>
                            </li>
                            <li class="link">
                                <a href="classes/ProductMapper.html" data-type="entity-link" >ProductMapper</a>
                            </li>
                            <li class="link">
                                <a href="classes/ProductModel.html" data-type="entity-link" >ProductModel</a>
                            </li>
                            <li class="link">
                                <a href="classes/ProductRepository.html" data-type="entity-link" >ProductRepository</a>
                            </li>
                            <li class="link">
                                <a href="classes/ProductsModel.html" data-type="entity-link" >ProductsModel</a>
                            </li>
                            <li class="link">
                                <a href="classes/ProgramRequestModel.html" data-type="entity-link" >ProgramRequestModel</a>
                            </li>
                            <li class="link">
                                <a href="classes/ResponseBaseModel.html" data-type="entity-link" >ResponseBaseModel</a>
                            </li>
                            <li class="link">
                                <a href="classes/ResponseBaseModel-1.html" data-type="entity-link" >ResponseBaseModel</a>
                            </li>
                            <li class="link">
                                <a href="classes/RoleModel.html" data-type="entity-link" >RoleModel</a>
                            </li>
                            <li class="link">
                                <a href="classes/SegmentModel.html" data-type="entity-link" >SegmentModel</a>
                            </li>
                            <li class="link">
                                <a href="classes/SuperPaymentReferenceModelResponse.html" data-type="entity-link" >SuperPaymentReferenceModelResponse</a>
                            </li>
                            <li class="link">
                                <a href="classes/ToastGenericRepository.html" data-type="entity-link" >ToastGenericRepository</a>
                            </li>
                            <li class="link">
                                <a href="classes/UrlToProgramModel.html" data-type="entity-link" >UrlToProgramModel</a>
                            </li>
                        </ul>
                    </li>
                        <li class="chapter">
                            <div class="simple menu-toggler" data-bs-toggle="collapse" ${ isNormalMode ? 'data-bs-target="#injectables-links"' :
                                'data-bs-target="#xs-injectables-links"' }>
                                <span class="icon ion-md-arrow-round-down"></span>
                                <span>Injectables</span>
                                <span class="icon ion-ios-arrow-down"></span>
                            </div>
                            <ul class="links collapse " ${ isNormalMode ? 'id="injectables-links"' : 'id="xs-injectables-links"' }>
                                <li class="link">
                                    <a href="injectables/BoardRepository.html" data-type="entity-link" >BoardRepository</a>
                                </li>
                                <li class="link">
                                    <a href="injectables/BoardService.html" data-type="entity-link" >BoardService</a>
                                </li>
                                <li class="link">
                                    <a href="injectables/CartUtil.html" data-type="entity-link" >CartUtil</a>
                                </li>
                                <li class="link">
                                    <a href="injectables/CatalogRepository.html" data-type="entity-link" >CatalogRepository</a>
                                </li>
                                <li class="link">
                                    <a href="injectables/CatalogService.html" data-type="entity-link" >CatalogService</a>
                                </li>
                                <li class="link">
                                    <a href="injectables/CategoryService.html" data-type="entity-link" >CategoryService</a>
                                </li>
                                <li class="link">
                                    <a href="injectables/ConfigService.html" data-type="entity-link" >ConfigService</a>
                                </li>
                                <li class="link">
                                    <a href="injectables/ConfigUtil.html" data-type="entity-link" >ConfigUtil</a>
                                </li>
                                <li class="link">
                                    <a href="injectables/DialogService.html" data-type="entity-link" >DialogService</a>
                                </li>
                                <li class="link">
                                    <a href="injectables/GtmDispatchEventsService.html" data-type="entity-link" >GtmDispatchEventsService</a>
                                </li>
                                <li class="link">
                                    <a href="injectables/GtmEventsService.html" data-type="entity-link" >GtmEventsService</a>
                                </li>
                                <li class="link">
                                    <a href="injectables/InactivityService.html" data-type="entity-link" >InactivityService</a>
                                </li>
                                <li class="link">
                                    <a href="injectables/LookAndFeelService.html" data-type="entity-link" >LookAndFeelService</a>
                                </li>
                                <li class="link">
                                    <a href="injectables/NotificationService.html" data-type="entity-link" >NotificationService</a>
                                </li>
                                <li class="link">
                                    <a href="injectables/PolicyService.html" data-type="entity-link" >PolicyService</a>
                                </li>
                                <li class="link">
                                    <a href="injectables/ProductService.html" data-type="entity-link" >ProductService</a>
                                </li>
                                <li class="link">
                                    <a href="injectables/ProductService-1.html" data-type="entity-link" >ProductService</a>
                                </li>
                                <li class="link">
                                    <a href="injectables/ProgramService.html" data-type="entity-link" >ProgramService</a>
                                </li>
                                <li class="link">
                                    <a href="injectables/SpinnerService.html" data-type="entity-link" >SpinnerService</a>
                                </li>
                                <li class="link">
                                    <a href="injectables/ToastGenericService.html" data-type="entity-link" >ToastGenericService</a>
                                </li>
                                <li class="link">
                                    <a href="injectables/UserUtils.html" data-type="entity-link" >UserUtils</a>
                                </li>
                                <li class="link">
                                    <a href="injectables/UtilsTitle.html" data-type="entity-link" >UtilsTitle</a>
                                </li>
                            </ul>
                        </li>
                    <li class="chapter">
                        <div class="simple menu-toggler" data-bs-toggle="collapse" ${ isNormalMode ? 'data-bs-target="#interceptors-links"' :
                            'data-bs-target="#xs-interceptors-links"' }>
                            <span class="icon ion-ios-swap"></span>
                            <span>Interceptors</span>
                            <span class="icon ion-ios-arrow-down"></span>
                        </div>
                        <ul class="links collapse " ${ isNormalMode ? 'id="interceptors-links"' : 'id="xs-interceptors-links"' }>
                            <li class="link">
                                <a href="interceptors/AuthInterceptor.html" data-type="entity-link" >AuthInterceptor</a>
                            </li>
                            <li class="link">
                                <a href="interceptors/HttpConfigInterceptor.html" data-type="entity-link" >HttpConfigInterceptor</a>
                            </li>
                            <li class="link">
                                <a href="interceptors/SpinnerIntercetor.html" data-type="entity-link" >SpinnerIntercetor</a>
                            </li>
                        </ul>
                    </li>
                    <li class="chapter">
                        <div class="simple menu-toggler" data-bs-toggle="collapse" ${ isNormalMode ? 'data-bs-target="#interfaces-links"' :
                            'data-bs-target="#xs-interfaces-links"' }>
                            <span class="icon ion-md-information-circle-outline"></span>
                            <span>Interfaces</span>
                            <span class="icon ion-ios-arrow-down"></span>
                        </div>
                        <ul class="links collapse " ${ isNormalMode ? ' id="interfaces-links"' : 'id="xs-interfaces-links"' }>
                            <li class="link">
                                <a href="interfaces/BoardEntityDto.html" data-type="entity-link" >BoardEntityDto</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/CategoryDto.html" data-type="entity-link" >CategoryDto</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/CategoryDto-1.html" data-type="entity-link" >CategoryDto</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/CuentasDto.html" data-type="entity-link" >CuentasDto</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/DireccionEstablecimientoDto.html" data-type="entity-link" >DireccionEstablecimientoDto</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/ErrorDto.html" data-type="entity-link" >ErrorDto</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/FeatureProductsResponseDto.html" data-type="entity-link" >FeatureProductsResponseDto</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/FilterProductsDto.html" data-type="entity-link" >FilterProductsDto</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/IMappedTheme.html" data-type="entity-link" >IMappedTheme</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/LabelsDto.html" data-type="entity-link" >LabelsDto</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/ListBoardsRequestDto.html" data-type="entity-link" >ListBoardsRequestDto</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/ListBoardsResponseDto.html" data-type="entity-link" >ListBoardsResponseDto</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/LookAndFeelDto.html" data-type="entity-link" >LookAndFeelDto</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/LstPuntosVencimientoDto.html" data-type="entity-link" >LstPuntosVencimientoDto</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/MenusAccesoDto.html" data-type="entity-link" >MenusAccesoDto</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/MixedPaymentValueResponseDto.html" data-type="entity-link" >MixedPaymentValueResponseDto</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/ProductByIdResponseDto.html" data-type="entity-link" >ProductByIdResponseDto</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/ProductCharacteristicDto.html" data-type="entity-link" >ProductCharacteristicDto</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/ProductDetailDto.html" data-type="entity-link" >ProductDetailDto</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/ProductDto.html" data-type="entity-link" >ProductDto</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/ProductImageDto.html" data-type="entity-link" >ProductImageDto</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/ProductInfoDto.html" data-type="entity-link" >ProductInfoDto</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/ProductsDto.html" data-type="entity-link" >ProductsDto</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/ProgramDto.html" data-type="entity-link" >ProgramDto</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/ProgramRequestDto.html" data-type="entity-link" >ProgramRequestDto</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/ResponseBaseDto.html" data-type="entity-link" >ResponseBaseDto</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/SegmentDto.html" data-type="entity-link" >SegmentDto</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/SubMenuDto.html" data-type="entity-link" >SubMenuDto</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/SubMenuSeccion2Dto.html" data-type="entity-link" >SubMenuSeccion2Dto</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/SubMenuSeccionDto.html" data-type="entity-link" >SubMenuSeccionDto</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/UrlToProgramDto.html" data-type="entity-link" >UrlToProgramDto</a>
                            </li>
                        </ul>
                    </li>
                    <li class="chapter">
                        <div class="simple menu-toggler" data-bs-toggle="collapse" ${ isNormalMode ? 'data-bs-target="#miscellaneous-links"'
                            : 'data-bs-target="#xs-miscellaneous-links"' }>
                            <span class="icon ion-ios-cube"></span>
                            <span>Miscellaneous</span>
                            <span class="icon ion-ios-arrow-down"></span>
                        </div>
                        <ul class="links collapse " ${ isNormalMode ? 'id="miscellaneous-links"' : 'id="xs-miscellaneous-links"' }>
                            <li class="link">
                                <a href="miscellaneous/enumerations.html" data-type="entity-link">Enums</a>
                            </li>
                            <li class="link">
                                <a href="miscellaneous/variables.html" data-type="entity-link">Variables</a>
                            </li>
                        </ul>
                    </li>
                        <li class="chapter">
                            <a data-type="chapter-link" href="routes.html"><span class="icon ion-ios-git-branch"></span>Routes</a>
                        </li>
                    <li class="chapter">
                        <a data-type="chapter-link" href="coverage.html"><span class="icon ion-ios-stats"></span>Documentation coverage</a>
                    </li>
                    <li class="divider"></li>
                    <li class="copyright">
                        Documentation generated using <a href="https://compodoc.app/" target="_blank" rel="noopener noreferrer">
                            <img data-src="images/compodoc-vectorise.png" class="img-responsive" data-type="compodoc-logo">
                        </a>
                    </li>
            </ul>
        </nav>
        `);
        this.innerHTML = tp.strings;
    }
});