import { saveSession } from './../../../core/utils/encryptData';
import { Component, HostListener, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { GTMSelectContent } from 'src/app/core/models/gtm-models/gtmSelectContent.model';
import { BoardEntityModel, ListBoardsResponseModel } from 'src/app/core/models/response/listBoardsResponse.model';
import { GtmDispatchEventsRepository } from 'src/app/core/repositories/gtmDispatchEvent.repository';
import { getSession } from 'src/app/core/utils/encryptData';
import { LoginValeproResponseModel } from 'src/app/infrastructure/dto/response/loginValeproResponse.model';
import { CuentasDto } from 'src/app/infrastructure/dto/valefiel/cuentas.dto';

@Component({
  selector: 'app-news',
  templateUrl: './news.component.html',
  styleUrls: ['./news.component.scss']
})
/**
 * Componente para mostrar noticias.
 */
export class NewsComponent implements OnInit {
  sections: BoardEntityModel[] = [];
  isSliderMoving: boolean = false;
  itemWidth: number;

   config = {
    swipe: true,
    variableWidth: true,
    firstMobile: true,
    slidesToScroll: 1,
    infinite: true,
    arrows: false,
    autoplay: true,
    pauseOnFocus: true,
    autoplaySpeed: 4000
  };
  user: LoginValeproResponseModel;

  @HostListener('window:resize', ['$event'])
  onResize(event: Event) {
    this.calculateItemWidth();
  }

  constructor(
    private router: Router,
    private gtmEventRepository: GtmDispatchEventsRepository
  ) {
    this.user = getSession<LoginValeproResponseModel>('accountValepro');
  }

  async ngOnInit() {
    while (this.sections.length === 0) {
      await this.delay(100);
      const allSections = getSession<ListBoardsResponseModel>('sections');
      if (allSections && allSections.boardEntities) {
        allSections.boardEntities.forEach(entity => {
          if (entity.boardTypeId === 3) {
            this.sections.push(entity);
          }
        });
      }
    }
    this.calculateItemWidth();
  }

  /**
   * Retrasa la ejecución durante un período de tiempo especificado en milisegundos.
   *
   * @param ms - El número de milisegundos para retrasar la ejecución.
   * @returns Una promesa que se resuelve después de que se haya completado el retraso.
   */
  delay(ms: number) {
    return new Promise(resolve => setTimeout(resolve, ms));
  }

  /**
   * mostrar noticia
   * @param newsSelected
   * @returns
   */
  showNews(newsSelected: BoardEntityModel) {
    if (this.isSliderMoving) {
      return;
    }

    saveSession(JSON.stringify(newsSelected), 'newsSelected');
    this.sendGtmData(newsSelected);
    this.router.navigateByUrl('main/newsList/detail/' + newsSelected.boardId);
  }

  /**
   *
   * @param noticias
   */
  sendGtmData(noticias: BoardEntityModel) {
    let tagData: GTMSelectContent = {
      event: "select_content",
      ParameterTarget: "Home",
      ParameterType: 'Imagen',
      ParameterCategory: "Noticias",
      IDAccount: this.user.AccountId,
      IDProgram: this.user.ProgramId,
      IDPerson: this.user.PersonId,
      UserName: this.user.UserName,
      ParameterText: noticias.name,
      ParameterItemID: noticias.boardId.toString()
    };
    this.gtmEventRepository.sendEvent(tagData);
  }

  /**
   * Envía datos a GTM.
   */
  sendGtmDataNews() {
    let tagData: GTMSelectContent = {
      event: "Select_content",
      ParameterTarget: "Home",
      ParameterType: 'button',
      ParameterCategory: 'Home-Vale PRO',
      IDAccount: this.user.AccountId,
      IDProgram: this.user.ProgramId,
      IDPerson: this.user.PersonId,
      UserName: this.user.UserName,
      ParameterText: 'Ver Todas las Noticias',
      ParameterItemID: ''
    }
    this.gtmEventRepository.sendEvent(tagData);
  }

  /**
   * Redirige a la lista de noticias.
   */
  redirectNewList() {
    this.sendGtmDataNews();
    this.router.navigate(["main/newsList"]);
  }

  /**
   * Método que se ejecuta antes de que ocurra un cambio en el slider.
   * @param event - El evento que desencadena el cambio.
   */
  onBeforeChange(event: any) {
    this.isSliderMoving = true;
  }

  /**
   * Descripción: Método que se ejecuta después de que el cambio ha ocurrido.
   *
   * @param none
   * @returns void
   */
  onAfterChange() {
    this.isSliderMoving = false;
  }

  calculateItemWidth() {
    const screenWidth = window.innerWidth;
    this.itemWidth = screenWidth - 100;
    if (screenWidth > 1000) {
      this.itemWidth = 900;
    }
  }

}
