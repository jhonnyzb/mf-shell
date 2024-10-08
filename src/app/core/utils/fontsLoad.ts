import { LookAndFeelModel } from "../models/response/urlToProgram.model";


/**
 * Aplica los estilos de fuentes especificados en el parámetro `lookAndFeel`.
 *
 * @param lookAndFeel - El objeto que contiene los estilos de fuentes a aplicar.
 */
export const applyFonts = (lookAndFeel: LookAndFeelModel): void => {
  const fontStyles = document.createElement('style');
  fontStyles.setAttribute('media', 'screen, print');

  fontStyles.innerHTML = `
  @import url('https://fonts.googleapis.com/css2?family=Agbalumo&family=Roboto:wght@400;500;700&display=swap');
  @import url('https://fonts.googleapis.com/css2?family=Noto+Sans:wght@300;500;700&display=swap');
  @import url('https://fonts.googleapis.com/css2?family=PT+Sans:wght@400;700&display=swap');
  @import url('https://fonts.googleapis.com/css2?family=Lato:wght@300;400;700&display=swap');
  @import url('https://fonts.googleapis.com/css2?family=Source+Sans+3:wght@300;500;700&display=swap');
  @import url('https://fonts.googleapis.com/css2?family=Open+Sans:wght@300;500;700&display=swap');
  @import url('https://fonts.googleapis.com/css2?family=Montserrat:wght@300;500;700&display=swap');
  @import url('https://fonts.googleapis.com/css2?family=Inter:wght@300;500;700&display=swap');
  @import url('https://fonts.googleapis.com/css2?family=Cabin:wght@400;700&display=swap');
  @import url('https://fonts.cdnfonts.com/css/euclid-circular-b');
  @import url('https://fonts.cdnfonts.com/css/source-sans-pro');


  .bold-32 {
    font-weight: bold;
    font-size: 32px;
    line-height: 1.2;
    font-family: ${lookAndFeel.FontFamilyName};
    display: inline-block;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    overflow-wrap: break-word;
    word-wrap: break-word;

    &.primary {
      color: var(--ngx-valepro-color-secondary);
    }

    &.secondary {
      color: var(--ngx-valepro-color-tertiary);
    }

    &.white {
      color: var(--color-white);
    }

    &.black {
      color: var(--color-black);
    }
  }

  .bold-31 {
    font-weight: bold;
    font-size: 31px;
    line-height: 1.2;
    font-family: ${lookAndFeel.FontFamilyName};
    display: inline-block;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    overflow-wrap: break-word;
    word-wrap: break-word;

  &.primary {
    color: var(--ngx-valepro-color-secondary);
  }

  &.secondary {
    color: var(--ngx-valepro-color-tertiary);
  }

  &.white {
    color: var(--color-white);
  }

  &.black {
    color: var(--color-black);
  }
}
  .bold-30 {
    font-weight: bold;
    font-size: 30px;
    line-height: 1.2;
    font-family: ${lookAndFeel.FontFamilyName};
    display: inline-block;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    overflow-wrap: break-word;
    word-wrap: break-word;

  &.primary {
    color: var(--ngx-valepro-color-secondary);
  }

  &.secondary {
    color: var(--ngx-valepro-color-tertiary);
  }

  &.white {
    color: var(--color-white);
  }

  &.black {
    color: var(--color-black);
  }
}

.bold-24 {
   font-weight: bold;
    font-size: 24px;
    line-height: 1.2;
    font-family: ${lookAndFeel.FontFamilyName};
    display: inline-block;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    overflow-wrap: break-word;
    word-wrap: break-word;

  &.primary {
    color: var(--ngx-valepro-color-secondary);
  }

  &.secondary {
    color: var(--ngx-valepro-color-tertiary);
  }

  &.white {
    color: var(--color-white);
  }

  &.black {
    color: var(--color-black);
  }
}

  .bold-20 {
    font-weight: bold;
    font-size: 20px;
    line-height: 1.2;
    font-family: ${lookAndFeel.FontFamilyName};
    display: inline-block;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    overflow-wrap: break-word;
    word-wrap: break-word;

    &.primary {
      color: var(--ngx-valepro-color-secondary);
    }

    &.secondary {
      color: var(--ngx-valepro-color-tertiary);
    }

    &.white {
      color: var(--color-white);
    }

    &.black {
      color: var(--color-black);
    }
  }

  .bold-18 {
    font-weight: bold;
    font-size: 18px;
    line-height: 1.2;
    font-family: ${lookAndFeel.FontFamilyName};
    display: inline-block;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    overflow-wrap: break-word;
    word-wrap: break-word;

    &.primary {
      color: var(--ngx-valepro-color-secondary);
    }

    &.secondary {
      color: var(--ngx-valepro-color-tertiary);
    }

    &.white {
      color: var(--color-white);
    }

    &.black {
      color: var(--color-black);
    }
  }

  .bold-16 {
    font-weight: bold;
    font-size: 16px;
    line-height: 1.2;
    font-family: ${lookAndFeel.FontFamilyName};
    display: inline-block;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    overflow-wrap: break-word;
    word-wrap: break-word;

    &.primary {
      color: var(--ngx-valepro-color-secondary);
    }

    &.secondary {
      color: var(--ngx-valepro-color-tertiary);
    }

    &.white {
      color: var(--color-white);
    }

    &.black {
      color: var(--color-black);
    }
  }

  .bold-14 {
    font-weight: bold;
    font-size: 14px;
    line-height: 1.2;
    font-family: ${lookAndFeel.FontFamilyName};
    display: inline-block;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    overflow-wrap: break-word;
    word-wrap: break-word;

    &.primary {
      color: var(--ngx-valepro-color-secondary);
    }

    &.secondary {
      color: var(--ngx-valepro-color-tertiary);
    }

    &.white {
      color: var(--color-white);
    }

    &.black {
      color: var(--color-black);
    }
  }


.bold-12 {
   font-weight: bold;
    font-size: 12px;
    line-height: 1.2;
    font-family: ${lookAndFeel.FontFamilyName};
    display: inline-block;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    overflow-wrap: break-word;
    word-wrap: break-word;

  &.primary {
    color: var(--ngx-valepro-color-secondary);
  }

  &.secondary {
    color: var(--ngx-valepro-color-tertiary);
  }

  &.white {
    color: var(--color-white);
  }

  &.black {
    color: var(--color-black);
  }
}
.bold-13 {
   font-weight: bold;
    font-size: 13px;
    line-height: 1.2;
    font-family: ${lookAndFeel.FontFamilyName};
    display: inline-block;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    overflow-wrap: break-word;
    word-wrap: break-word;

  &.primary {
    color: var(--ngx-valepro-color-secondary);
  }

  &.secondary {
    color: var(--ngx-valepro-color-tertiary);
  }

  &.white {
    color: var(--color-white);
  }

  &.black {
    color: var(--color-black);
  }
}

.regular-24 {
    font-weight: regular;
    font-size: 24px;
    line-height: 1.2;
    font-family: ${lookAndFeel.FontFamilyName};
    display: inline-block;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    overflow-wrap: break-word;
    word-wrap: break-word;

    &.primary {
      color: var(--ngx-valepro-color-secondary);
    }

    &.secondary {
      color: var(--ngx-valepro-color-tertiary);
    }

    &.white {
      color: var(--color-white);
    }

    &.black {
      color: var(--color-black);
    }
  }

.regular-30 {
    font-weight: regular;
    font-size: 30px;
    line-height: 1.2;
    font-family: ${lookAndFeel.FontFamilyName};
    display: inline-block;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    overflow-wrap: break-word;
    word-wrap: break-word;

    &.primary {
      color: var(--ngx-valepro-color-secondary);
    }

    &.secondary {
      color: var(--ngx-valepro-color-tertiary);
    }

    &.white {
      color: var(--color-white);
    }

    &.black {
      color: var(--color-black);
    }
  }

.regular-18 {
    font-weight: regular;
    font-size: 18px;
    line-height: 1.2;
    font-family: ${lookAndFeel.FontFamilyName};
    display: inline-block;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    overflow-wrap: break-word;
    word-wrap: break-word;

    &.primary {
      color: var(--ngx-valepro-color-secondary);
    }

    &.secondary {
      color: var(--ngx-valepro-color-tertiary);
    }

    &.white {
      color: var(--color-white);
    }

    &.black {
      color: var(--color-black);
    }
  }



  .regular-14 {
    font-weight: regular;
    font-size: 14px;
    line-height: 1.2;
    font-family: ${lookAndFeel.FontFamilyName};
    display: inline-block;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    overflow-wrap: break-word;
    word-wrap: break-word;

    &.primary {
      color: var(--ngx-valepro-color-secondary);
    }

    &.secondary {
      color: var(--ngx-valepro-color-tertiary);
    }

    &.white {
      color: var(--color-white);
    }

    &.black {
      color: var(--color-black);
    }
  }
  .regular-13 {
    font-weight: regular;
    font-size: 13px;
    line-height: 1.2;
    font-family: ${lookAndFeel.FontFamilyName};
    display: inline-block;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    overflow-wrap: break-word;
    word-wrap: break-word;

    &.primary {
      color: var(--ngx-valepro-color-secondary);
    }

    &.secondary {
      color: var(--ngx-valepro-color-tertiary);
    }

    &.white {
      color: var(--color-white);
    }

    &.black {
      color: var(--color-black);
    }
  }

  .regular-16 {
    font-weight: regular;
    font-size: 16px;
    line-height: 1.2;
    font-family: ${lookAndFeel.FontFamilyName};
    display: inline-block;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    overflow-wrap: break-word;
    word-wrap: break-word;

    &.primary {
      color: var(--ngx-valepro-color-secondary);
    }

    &.secondary {
      color: var(--ngx-valepro-color-tertiary);
    }

    &.white {
      color: var(--color-white);
    }

    &.black {
      color: var(--color-black);
    }
  }

  .medium-20 {
    font-weight: regular;
    font-size: 20px;
    line-height: 1.2;
    font-family: ${lookAndFeel.FontFamilyName};
    display: inline-block;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    overflow-wrap: break-word;
    word-wrap: break-word;

    &.primary {
      color: var(--ngx-valepro-color-secondary);
    }

    &.secondary {
      color: var(--ngx-valepro-color-tertiary);
    }

    &.white {
      color: var(--color-white);
    }

    &.black {
      color: var(--color-black);
    }
  }

  .medium-10 {
    font-weight: regular;
    font-size: 10px;
    line-height: 1.2;
    font-family: ${lookAndFeel.FontFamilyName};
    display: inline-block;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    overflow-wrap: break-word;
    word-wrap: break-word;

    &.primary {
      color: var(--ngx-valepro-color-secondary);
    }

    &.secondary {
      color: var(--ngx-valepro-color-tertiary);
    }

    &.white {
      color: var(--color-white);
    }

    &.black {
      color: var(--color-black);
    }
  }

  .medium-17 {
    font-weight: regular;
    font-size: 17px;
    line-height: 1.2;
    font-family: ${lookAndFeel.FontFamilyName};
    display: inline-block;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    overflow-wrap: break-word;
    word-wrap: break-word;

    &.primary {
      color: var(--ngx-valepro-color-secondary);
    }

    &.secondary {
      color: var(--ngx-valepro-color-secondary);
    }

    &.white {
      color: var(--color-white);
    }

    &.black {
      color: var(--color-black);
    }
  }

  .light-30 {
    font-weight: regular;
    font-size: 30px;
    line-height: 1.2;
    font-family: ${lookAndFeel.FontFamilyName};
    display: inline-block;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    overflow-wrap: break-word;
    word-wrap: break-word;

    &.primary {
      color: var(--ngx-valepro-color-secondary);
    }

    &.secondary {
      color: var(--ngx-valepro-color-secondary);
    }

    &.white {
      color: var(--color-white);
    }

    &.black {
      color: var(--color-black);
    }
  }

  .light-20 {
    font-weight: regular;
    font-size: 20px;
    line-height: 1.2;
    font-family: ${lookAndFeel.FontFamilyName};
    display: inline-block;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    overflow-wrap: break-word;
    word-wrap: break-word;

    &.primary {
      color: var(--ngx-valepro-color-secondary);
    }

    &.secondary {
      color: var(--ngx-valepro-color-secondary);
    }

    &.white {
      color: var(--color-white);
    }

    &.black {
      color: var(--color-black);
    }
  }

  .light-15 {
    font-weight: regular;
    font-size: 15px;
    line-height: 1.2;
    font-family: ${lookAndFeel.FontFamilyName};
    display: inline-block;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    overflow-wrap: break-word;
    word-wrap: break-word;

    &.primary {
      color: var(--ngx-valepro-color-secondary);
    }

    &.secondary {
      color: var(--ngx-valepro-color-secondary);
    }

    &.white {
      color: var(--color-white);
    }

    &.black {
      color: var(--color-black);
    }
  }

  .light-14 {
    font-weight: regular;
    font-size: 14px;
    line-height: 1.2;
    font-family: ${lookAndFeel.FontFamilyName};
    display: inline-block;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    overflow-wrap: break-word;
    word-wrap: break-word;

    &.primary {
      color: var(--ngx-valepro-color-secondary);
    }

    &.secondary {
      color: var(--ngx-valepro-color-secondary);
    }

    &.white {
      color: var(--color-white);
    }

    &.black {
      color: var(--color-black);
    }
  }

  .light-10 {
    font-weight: regular;
    font-size: 10px;
    line-height: 1.2;
    font-family: ${lookAndFeel.FontFamilyName};
    display: inline-block;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    overflow-wrap: break-word;
    word-wrap: break-word;

    &.primary {
      color: var(--ngx-valepro-color-secondary);
    }

    &.secondary {
      color: var(--ngx-valepro-color-secondary);
    }

    &.white {
      color: var(--color-white);
    }

    &.black {
      color: var(--color-black);
    }
  }


  .regular-12 {
   font-weight: regular;
    font-size: 12px;
    line-height: 1.2;
    font-family: ${lookAndFeel.FontFamilyName};
    display: inline-block;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    overflow-wrap: break-word;
    word-wrap: break-word;

  &.primary {
    color: var(--ngx-valepro-color-secondary);
  }

  &.secondary {
    color: var(--ngx-valepro-color-tertiary);
  }

  &.white {
    color: var(--color-white);
  }

  &.black {
    color: var(--color-black);
  }

  &.gris {
    color: var(--color-gris);
  }

  &.primary20 {
    color: var(--ngx-valepro-color-secondary20);
  }

  &.primary40 {
    color: var(--ngx-valepro-color-secondary40);
  }

  &.primary60 {
    color: var(--ngx-valepro-color-secondary60);
  }
}


  .regular-36 {
   font-weight: regular;
    font-size: 36px;
    line-height: 1.2;
    font-family: ${lookAndFeel.FontFamilyName};
    display: inline-block;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    overflow-wrap: break-word;
    word-wrap: break-word;

  &.primary {
    color: var(--ngx-valepro-color-secondary);
  }

  &.secondary {
    color: var(--ngx-valepro-color-tertiary);
  }

  &.white {
    color: var(--color-white);
  }

  &.black {
    color: var(--color-black);
  }

  &.gris {
    color: var(--color-gris);
  }

  &.primary20 {
    color: var(--ngx-valepro-color-secondary20);
  }

  &.primary40 {
    color: var(--ngx-valepro-color-secondary40);
  }

  &.primary60 {
    color: var(--ngx-valepro-color-secondary60);
  }
}




`;
  document.head.appendChild(fontStyles);
};
