import { IAtomType } from '@codelab/shared/abstract/core'

/**
 * The atoms that are not self closing and need text content to make sense
 */
export const customTextInjectionWhiteList = [
  IAtomType.HtmlA,
  IAtomType.HtmlAside,
  IAtomType.HtmlButton,
  IAtomType.HtmlCode,
  IAtomType.HtmlDialog,
  IAtomType.HtmlDiv,
  IAtomType.HtmlEm,
  IAtomType.HtmlH1,
  IAtomType.HtmlH2,
  IAtomType.HtmlH3,
  IAtomType.HtmlH4,
  IAtomType.HtmlH5,
  IAtomType.HtmlH6,
  IAtomType.HtmlI,
  IAtomType.HtmlP,
  IAtomType.HtmlPre,
  IAtomType.HtmlS,
  IAtomType.HtmlSmall,
  IAtomType.HtmlSpan,
  IAtomType.HtmlStrong,
  IAtomType.HtmlSub,
  IAtomType.HtmlSup,
  IAtomType.AntDesignButton,
  IAtomType.AntDesignTypographyParagraph,
  IAtomType.AntDesignTypographyText,
  IAtomType.AntDesignTypographyTitle,
  IAtomType.MuiAlertTitle,
  IAtomType.MuiButton,
  IAtomType.MuiButtonBase,
  IAtomType.MuiButtonUnstyled,
  IAtomType.MuiDialogTitle,
  IAtomType.MuiDialogContentText,
  IAtomType.MuiLink,
  IAtomType.MuiTypography,
  IAtomType.NextLink,
  IAtomType.Text,
]
