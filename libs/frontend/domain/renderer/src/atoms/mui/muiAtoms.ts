import { IAtomType } from '@codelab/shared/abstract/core'
import { dynamicLoader } from '../dynamicLoader'
import type { AtomsRecord } from '../types'

export const muiAtoms: AtomsRecord = {
  [IAtomType.MuiAccordion]: dynamicLoader(
    () => import('@mui/material/Accordion'),
  ),
  [IAtomType.MuiAccordionActions]: dynamicLoader(
    () => import('@mui/material/AccordionActions'),
  ),
  [IAtomType.MuiAccordionDetails]: dynamicLoader(
    () => import('@mui/material/AccordionDetails'),
  ),
  [IAtomType.MuiAccordionSummary]: dynamicLoader(
    () => import('@mui/material/AccordionSummary'),
  ),
  [IAtomType.MuiAlert]: dynamicLoader(() => import('@mui/material/Alert')),
  [IAtomType.MuiAlertTitle]: dynamicLoader(
    () => import('@mui/material/AlertTitle'),
  ),
  [IAtomType.MuiAppBar]: dynamicLoader(() => import('@mui/material/AppBar')),
  [IAtomType.MuiAutocomplete]: dynamicLoader(
    () => import('@mui/material/Autocomplete'),
  ),
  [IAtomType.MuiAvatar]: dynamicLoader(() => import('@mui/material/Avatar')),
  [IAtomType.MuiAvatarGroup]: dynamicLoader(
    () => import('@mui/material/AvatarGroup'),
  ),
  [IAtomType.MuiBackdrop]: dynamicLoader(
    () => import('@mui/material/Backdrop'),
  ),
  [IAtomType.MuiBadge]: dynamicLoader(() => import('@mui/material/Badge')),
  [IAtomType.MuiBadgeUnstyled]: dynamicLoader(
    () => import('@mui/base/BadgeUnstyled'),
  ),
  [IAtomType.MuiBottomNavigation]: dynamicLoader(
    () => import('@mui/material/BottomNavigation'),
  ),
  [IAtomType.MuiBottomNavigationAction]: dynamicLoader(
    () => import('@mui/material/BottomNavigationAction'),
  ),
  [IAtomType.MuiBox]: dynamicLoader(() => import('@mui/material/Box')),
  [IAtomType.MuiBreadcrumbs]: dynamicLoader(
    () => import('@mui/material/Breadcrumbs'),
  ),
  [IAtomType.MuiButton]: dynamicLoader(() => import('@mui/material/Button')),
  [IAtomType.MuiButtonBase]: dynamicLoader(
    () => import('@mui/material/ButtonBase'),
  ),
  [IAtomType.MuiButtonGroup]: dynamicLoader(
    () => import('@mui/material/ButtonGroup'),
  ),
  [IAtomType.MuiButtonUnstyled]: dynamicLoader(
    () => import('@mui/base/ButtonUnstyled'),
  ),
  [IAtomType.MuiCalendarPicker]: dynamicLoader(
    () => import('@mui/lab/CalendarPicker'),
  ),
  [IAtomType.MuiCalendarPickerSkeleton]: dynamicLoader(
    () => import('@mui/lab/CalendarPickerSkeleton'),
  ),
  [IAtomType.MuiCard]: dynamicLoader(() => import('@mui/material/Card')),
  [IAtomType.MuiCardActionArea]: dynamicLoader(
    () => import('@mui/material/CardActionArea'),
  ),
  [IAtomType.MuiCardActions]: dynamicLoader(
    () => import('@mui/material/CardActions'),
  ),
  [IAtomType.MuiCardContent]: dynamicLoader(
    () => import('@mui/material/CardContent'),
  ),
  [IAtomType.MuiCardHeader]: dynamicLoader(
    () => import('@mui/material/CardHeader'),
  ),
  [IAtomType.MuiCardMedia]: dynamicLoader(
    () => import('@mui/material/CardMedia'),
  ),
  [IAtomType.MuiCheckbox]: dynamicLoader(
    () => import('@mui/material/Checkbox'),
  ),
  [IAtomType.MuiChip]: dynamicLoader(() => import('@mui/material/Chip')),
  [IAtomType.MuiCircularProgress]: dynamicLoader(
    () => import('@mui/material/CircularProgress'),
  ),
  [IAtomType.MuiClickAwayListener]: dynamicLoader(
    () => import('@mui/material/ClickAwayListener'),
  ),
  // [AtomType.MuiClockPicker]: dynamicLoader(()=>import('@mui/material/ClockPicker')), ??
  [IAtomType.MuiCollapse]: dynamicLoader(
    () => import('@mui/material/Collapse'),
  ),
  [IAtomType.MuiContainer]: dynamicLoader(
    () => import('@mui/material/Container'),
  ),
  [IAtomType.MuiCssBaseline]: dynamicLoader(
    () => import('@mui/material/CssBaseline'),
  ),
  // [AtomType.MuiDataGrid]: dynamicLoader(()=>import('@mui/x-data-grid')), // not working for some reason ,can't find @material-ui/core/badge?
  [IAtomType.MuiDatePicker]: dynamicLoader(() =>
    import('@mui/x-date-pickers/DatePicker').then((x) => x.DatePicker),
  ),
  [IAtomType.MuiDateRangePicker]: dynamicLoader(
    () => import('@mui/lab/DateRangePicker'),
  ),
  [IAtomType.MuiDateRangePickerDay]: dynamicLoader(
    () => import('@mui/lab/DateRangePickerDay'),
  ),
  [IAtomType.MuiDateTimePicker]: dynamicLoader(
    () => import('@mui/lab/DateTimePicker'),
  ),
  [IAtomType.MuiDesktopDatePicker]: dynamicLoader(
    () => import('@mui/lab/DesktopDatePicker'),
  ),
  [IAtomType.MuiDesktopDateRangePicker]: dynamicLoader(
    () => import('@mui/lab/DesktopDateRangePicker'),
  ),
  [IAtomType.MuiDesktopDateTimePicker]: dynamicLoader(
    () => import('@mui/lab/DesktopDateTimePicker'),
  ),
  [IAtomType.MuiDesktopTimePicker]: dynamicLoader(
    () => import('@mui/lab/DesktopTimePicker'),
  ),
  [IAtomType.MuiDialog]: dynamicLoader(() => import('@mui/material/Dialog')),
  [IAtomType.MuiDialogActions]: dynamicLoader(
    () => import('@mui/material/DialogActions'),
  ),
  [IAtomType.MuiDialogContent]: dynamicLoader(
    () => import('@mui/material/DialogContent'),
  ),
  [IAtomType.MuiDialogContentText]: dynamicLoader(
    () => import('@mui/material/DialogContentText'),
  ),
  [IAtomType.MuiDialogTitle]: dynamicLoader(
    () => import('@mui/material/DialogTitle'),
  ),
  [IAtomType.MuiDivider]: dynamicLoader(() => import('@mui/material/Divider')),
  [IAtomType.MuiDrawer]: dynamicLoader(() => import('@mui/material/Drawer')),
  [IAtomType.MuiFab]: dynamicLoader(() => import('@mui/material/Fab')),
  [IAtomType.MuiFade]: dynamicLoader(() => import('@mui/material/Fade')),
  [IAtomType.MuiFilledInput]: dynamicLoader(
    () => import('@mui/material/FilledInput'),
  ),
  [IAtomType.MuiFormControl]: dynamicLoader(
    () => import('@mui/material/FormControl'),
  ),
  [IAtomType.MuiFormControlLabel]: dynamicLoader(
    () => import('@mui/material/FormControlLabel'),
  ),
  [IAtomType.MuiFormControlUnstyled]: dynamicLoader(
    () => import('@mui/base/FormControlUnstyled'),
  ),
  [IAtomType.MuiFormGroup]: dynamicLoader(
    () => import('@mui/material/FormGroup'),
  ),
  [IAtomType.MuiFormHelperText]: dynamicLoader(
    () => import('@mui/material/FormHelperText'),
  ),
  [IAtomType.MuiFormLabel]: dynamicLoader(
    () => import('@mui/material/FormLabel'),
  ),
  [IAtomType.MuiGlobalStyles]: dynamicLoader(
    () => import('@mui/material/GlobalStyles'),
  ),
  [IAtomType.MuiGrid]: dynamicLoader(() => import('@mui/material/Grid')),
  [IAtomType.MuiGrow]: dynamicLoader(() => import('@mui/material/Grow')),
  [IAtomType.MuiHidden]: dynamicLoader(() => import('@mui/material/Hidden')),
  // dynamic causes jest tests to fail
  // Size too large, comment out for now
  // [IAtomType.MuiIcon]: import('@codelab/frontend/platform/atoms').then(
  //   (mod) => mod.MuiIcon,
  // ) as any,
  [IAtomType.MuiIconButton]: dynamicLoader(
    () => import('@mui/material/IconButton'),
  ),
  [IAtomType.MuiImageList]: dynamicLoader(
    () => import('@mui/material/ImageList'),
  ),
  [IAtomType.MuiImageListItem]: dynamicLoader(
    () => import('@mui/material/ImageListItem'),
  ),
  [IAtomType.MuiImageListItemBar]: dynamicLoader(
    () => import('@mui/material/ImageListItemBar'),
  ),
  [IAtomType.MuiInput]: dynamicLoader(() => import('@mui/material/Input')),
  [IAtomType.MuiInputAdornment]: dynamicLoader(
    () => import('@mui/material/InputAdornment'),
  ),
  [IAtomType.MuiInputBase]: dynamicLoader(
    () => import('@mui/material/InputBase'),
  ),
  [IAtomType.MuiInputLabel]: dynamicLoader(
    () => import('@mui/material/InputLabel'),
  ),
  [IAtomType.MuiLinearProgress]: dynamicLoader(
    () => import('@mui/material/LinearProgress'),
  ),
  [IAtomType.MuiLink]: dynamicLoader(() => import('@mui/material/Link')),
  [IAtomType.MuiList]: dynamicLoader(() => import('@mui/material/List')),
  [IAtomType.MuiListItem]: dynamicLoader(
    () => import('@mui/material/ListItem'),
  ),
  [IAtomType.MuiListItemAvatar]: dynamicLoader(
    () => import('@mui/material/ListItemAvatar'),
  ),
  [IAtomType.MuiListItemButton]: dynamicLoader(
    () => import('@mui/material/ListItemButton'),
  ),
  [IAtomType.MuiListItemIcon]: dynamicLoader(
    () => import('@mui/material/ListItemIcon'),
  ),
  [IAtomType.MuiListItemSecondaryAction]: dynamicLoader(
    () => import('@mui/material/ListItemSecondaryAction'),
  ),
  [IAtomType.MuiListItemText]: dynamicLoader(
    () => import('@mui/material/ListItemText'),
  ),
  [IAtomType.MuiListSubheader]: dynamicLoader(
    () => import('@mui/material/ListSubheader'),
  ),
  [IAtomType.MuiLoadingButton]: dynamicLoader(
    () => import('@mui/lab/LoadingButton'),
  ),
  [IAtomType.MuiMasonry]: dynamicLoader(() => import('@mui/lab/Masonry')),
  [IAtomType.MuiMenu]: dynamicLoader(() => import('@mui/material/Menu')),
  [IAtomType.MuiMenuItem]: dynamicLoader(
    () => import('@mui/material/MenuItem'),
  ),
  [IAtomType.MuiMenuList]: dynamicLoader(
    () => import('@mui/material/MenuList'),
  ),
  [IAtomType.MuiMobileDatePicker]: dynamicLoader(
    () => import('@mui/lab/MobileDatePicker'),
  ),
  [IAtomType.MuiMobileDateRangePicker]: dynamicLoader(
    () => import('@mui/lab/MobileDateRangePicker'),
  ),
  [IAtomType.MuiMobileDateTimePicker]: dynamicLoader(
    () => import('@mui/lab/MobileDateTimePicker'),
  ),
  [IAtomType.MuiMobileStepper]: dynamicLoader(
    () => import('@mui/material/MobileStepper'),
  ),
  [IAtomType.MuiMobileTimePicker]: dynamicLoader(
    () => import('@mui/lab/MobileTimePicker'),
  ),
  [IAtomType.MuiModal]: dynamicLoader(() => import('@mui/material/Modal')),
  [IAtomType.MuiModalUnstyled]: dynamicLoader(
    () => import('@mui/base/ModalUnstyled'),
  ),
  [IAtomType.MuiMonthPicker]: dynamicLoader(
    () => import('@mui/lab/MonthPicker'),
  ),
  [IAtomType.MuiNativeSelect]: dynamicLoader(
    () => import('@mui/material/NativeSelect'),
  ),
  [IAtomType.MuiNoSsr]: dynamicLoader(() => import('@mui/material/NoSsr')),
  [IAtomType.MuiOutlinedInput]: dynamicLoader(
    () => import('@mui/material/OutlinedInput'),
  ),
  [IAtomType.MuiPagination]: dynamicLoader(
    () => import('@mui/material/Pagination'),
  ),
  [IAtomType.MuiPaginationItem]: dynamicLoader(
    () => import('@mui/material/PaginationItem'),
  ),
  [IAtomType.MuiPaper]: dynamicLoader(() => import('@mui/material/Paper')),
  [IAtomType.MuiPickersDay]: dynamicLoader(() => import('@mui/lab/PickersDay')),
  [IAtomType.MuiPopover]: dynamicLoader(() => import('@mui/material/Popover')),
  [IAtomType.MuiPopper]: dynamicLoader(() => import('@mui/material/Popper')),
  [IAtomType.MuiPortal]: dynamicLoader(() => import('@mui/material/Portal')),
  [IAtomType.MuiRadio]: dynamicLoader(() => import('@mui/material/Radio')),
  [IAtomType.MuiRadioGroup]: dynamicLoader(
    () => import('@mui/material/RadioGroup'),
  ),
  [IAtomType.MuiRating]: dynamicLoader(() => import('@mui/material/Rating')),
  [IAtomType.MuiScopedCssBaseline]: dynamicLoader(
    () => import('@mui/material/ScopedCssBaseline'),
  ),
  [IAtomType.MuiSelect]: dynamicLoader(() => import('@mui/material/Select')),
  [IAtomType.MuiSkeleton]: dynamicLoader(
    () => import('@mui/material/Skeleton'),
  ),
  [IAtomType.MuiSlide]: dynamicLoader(() => import('@mui/material/Slide')),
  [IAtomType.MuiSlider]: dynamicLoader(() => import('@mui/material/Slider')),
  [IAtomType.MuiSliderUnstyled]: dynamicLoader(
    () => import('@mui/base/SliderUnstyled'),
  ),
  [IAtomType.MuiSnackbar]: dynamicLoader(
    () => import('@mui/material/Snackbar'),
  ),
  [IAtomType.MuiSnackbarContent]: dynamicLoader(
    () => import('@mui/material/SnackbarContent'),
  ),
  [IAtomType.MuiSpeedDial]: dynamicLoader(
    () => import('@mui/material/SpeedDial'),
  ),
  [IAtomType.MuiSpeedDialAction]: dynamicLoader(
    () => import('@mui/material/SpeedDialAction'),
  ),
  [IAtomType.MuiSpeedDialIcon]: dynamicLoader(
    () => import('@mui/material/SpeedDialIcon'),
  ),
  [IAtomType.MuiStack]: dynamicLoader(() => import('@mui/material/Stack')),
  [IAtomType.MuiStaticDatePicker]: dynamicLoader(
    () => import('@mui/lab/StaticDatePicker'),
  ),
  [IAtomType.MuiStaticDateRangePicker]: dynamicLoader(
    () => import('@mui/lab/StaticDateRangePicker'),
  ),
  [IAtomType.MuiStaticDateTimePicker]: dynamicLoader(
    () => import('@mui/lab/StaticDateTimePicker'),
  ),
  [IAtomType.MuiStaticTimePicker]: dynamicLoader(
    () => import('@mui/lab/StaticTimePicker'),
  ),
  [IAtomType.MuiStep]: dynamicLoader(() => import('@mui/material/Step')),
  [IAtomType.MuiStepButton]: dynamicLoader(
    () => import('@mui/material/StepButton'),
  ),
  [IAtomType.MuiStepConnector]: dynamicLoader(
    () => import('@mui/material/StepConnector'),
  ),
  [IAtomType.MuiStepContent]: dynamicLoader(
    () => import('@mui/material/StepContent'),
  ),
  [IAtomType.MuiStepIcon]: dynamicLoader(
    () => import('@mui/material/StepIcon'),
  ),
  [IAtomType.MuiStepLabel]: dynamicLoader(
    () => import('@mui/material/StepLabel'),
  ),
  [IAtomType.MuiStepper]: dynamicLoader(() => import('@mui/material/Stepper')),
  [IAtomType.MuiSvgIcon]: dynamicLoader(() => import('@mui/material/SvgIcon')),
  [IAtomType.MuiSwipeableDrawer]: dynamicLoader(
    () => import('@mui/material/SwipeableDrawer'),
  ),
  [IAtomType.MuiSwitch]: dynamicLoader(() => import('@mui/material/Switch')),
  [IAtomType.MuiSwitchUnstyled]: dynamicLoader(
    () => import('@mui/base/SwitchUnstyled'),
  ),
  [IAtomType.MuiTab]: dynamicLoader(() => import('@mui/material/Tab')),
  [IAtomType.MuiTabContext]: dynamicLoader(() => import('@mui/lab/TabContext')),
  [IAtomType.MuiTabList]: dynamicLoader(() => import('@mui/lab/TabList')),
  [IAtomType.MuiTabPanel]: dynamicLoader(() => import('@mui/lab/TabPanel')),
  [IAtomType.MuiTabScrollButton]: dynamicLoader(
    () => import('@mui/material/TabScrollButton'),
  ),
  [IAtomType.MuiTable]: dynamicLoader(() => import('@mui/material/Table')),
  [IAtomType.MuiTableBody]: dynamicLoader(
    () => import('@mui/material/TableBody'),
  ),
  [IAtomType.MuiTableCell]: dynamicLoader(
    () => import('@mui/material/TableCell'),
  ),
  [IAtomType.MuiTableContainer]: dynamicLoader(
    () => import('@mui/material/TableContainer'),
  ),
  [IAtomType.MuiTableFooter]: dynamicLoader(
    () => import('@mui/material/TableFooter'),
  ),
  [IAtomType.MuiTableHead]: dynamicLoader(
    () => import('@mui/material/TableHead'),
  ),
  [IAtomType.MuiTablePagination]: dynamicLoader(
    () => import('@mui/material/TablePagination'),
  ),
  [IAtomType.MuiTableRow]: dynamicLoader(
    () => import('@mui/material/TableRow'),
  ),
  [IAtomType.MuiTableSortLabel]: dynamicLoader(
    () => import('@mui/material/TableSortLabel'),
  ),
  [IAtomType.MuiTabs]: dynamicLoader(() => import('@mui/material/Tabs')),
  [IAtomType.MuiTextField]: dynamicLoader(
    () => import('@mui/material/TextField'),
  ),
  [IAtomType.MuiTextareaAutosize]: dynamicLoader(
    () => import('@mui/material/TextareaAutosize'),
  ),
  [IAtomType.MuiTimePicker]: dynamicLoader(() => import('@mui/lab/TimePicker')),
  [IAtomType.MuiTimeline]: dynamicLoader(() => import('@mui/lab/Timeline')),
  [IAtomType.MuiTimelineConnector]: dynamicLoader(
    () => import('@mui/lab/TimelineConnector'),
  ),
  [IAtomType.MuiTimelineContent]: dynamicLoader(
    () => import('@mui/lab/TimelineContent'),
  ),
  [IAtomType.MuiTimelineDot]: dynamicLoader(
    () => import('@mui/lab/TimelineDot'),
  ),
  [IAtomType.MuiTimelineItem]: dynamicLoader(
    () => import('@mui/lab/TimelineItem'),
  ),
  [IAtomType.MuiTimelineOppositeContent]: dynamicLoader(
    () => import('@mui/lab/TimelineOppositeContent'),
  ),
  [IAtomType.MuiTimelineSeparator]: dynamicLoader(
    () => import('@mui/lab/TimelineSeparator'),
  ),
  [IAtomType.MuiToggleButton]: dynamicLoader(
    () => import('@mui/material/ToggleButton'),
  ),
  [IAtomType.MuiToggleButtonGroup]: dynamicLoader(
    () => import('@mui/material/ToggleButtonGroup'),
  ),
  [IAtomType.MuiToolbar]: dynamicLoader(() => import('@mui/material/Toolbar')),
  [IAtomType.MuiTooltip]: dynamicLoader(() => import('@mui/material/Tooltip')),
  [IAtomType.MuiTreeItem]: dynamicLoader(() => import('@mui/lab/TreeItem')),
  [IAtomType.MuiTreeView]: dynamicLoader(() => import('@mui/lab/TreeView')),
  [IAtomType.MuiTypography]: dynamicLoader(
    () => import('@mui/material/Typography'),
  ),
  [IAtomType.MuiUnstableTrapFocus]: dynamicLoader(
    () => import('@mui/material/Unstable_TrapFocus'),
  ),
  [IAtomType.MuiYearPicker]: dynamicLoader(() => import('@mui/lab/YearPicker')),
  [IAtomType.MuiZoom]: dynamicLoader(() => import('@mui/material/Zoom')),
}
