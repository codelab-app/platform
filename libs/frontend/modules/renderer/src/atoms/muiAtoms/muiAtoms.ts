import { IAtomType } from '@codelab/shared/abstract/core'
import { dynamicImport } from '../import'
import { AtomsRecord } from '../types'

export const muiAtoms: AtomsRecord = {
  [IAtomType.MuiAccordion]: dynamicImport(
    () => import('@mui/material/Accordion'),
  ),
  [IAtomType.MuiAccordionActions]: dynamicImport(
    () => import('@mui/material/AccordionActions'),
  ),
  [IAtomType.MuiAccordionDetails]: dynamicImport(
    () => import('@mui/material/AccordionDetails'),
  ),
  [IAtomType.MuiAccordionSummary]: dynamicImport(
    () => import('@mui/material/AccordionSummary'),
  ),
  [IAtomType.MuiAlert]: dynamicImport(() => import('@mui/material/Alert')),
  [IAtomType.MuiAlertTitle]: dynamicImport(
    () => import('@mui/material/AlertTitle'),
  ),
  [IAtomType.MuiAppBar]: dynamicImport(() => import('@mui/material/AppBar')),
  [IAtomType.MuiAutocomplete]: dynamicImport(
    () => import('@mui/material/Autocomplete'),
  ),
  [IAtomType.MuiAvatar]: dynamicImport(() => import('@mui/material/Avatar')),
  [IAtomType.MuiAvatarGroup]: dynamicImport(
    () => import('@mui/material/AvatarGroup'),
  ),
  [IAtomType.MuiBackdrop]: dynamicImport(
    () => import('@mui/material/Backdrop'),
  ),
  [IAtomType.MuiBadge]: dynamicImport(() => import('@mui/material/Badge')),
  [IAtomType.MuiBadgeUnstyled]: dynamicImport(
    () => import('@mui/base/BadgeUnstyled'),
  ),
  [IAtomType.MuiBottomNavigation]: dynamicImport(
    () => import('@mui/material/BottomNavigation'),
  ),
  [IAtomType.MuiBottomNavigationAction]: dynamicImport(
    () => import('@mui/material/BottomNavigationAction'),
  ),
  [IAtomType.MuiBox]: dynamicImport(() => import('@mui/material/Box')),
  [IAtomType.MuiBreadcrumbs]: dynamicImport(
    () => import('@mui/material/Breadcrumbs'),
  ),
  [IAtomType.MuiButton]: dynamicImport(() => import('@mui/material/Button')),
  [IAtomType.MuiButtonBase]: dynamicImport(
    () => import('@mui/material/ButtonBase'),
  ),
  [IAtomType.MuiButtonGroup]: dynamicImport(
    () => import('@mui/material/ButtonGroup'),
  ),
  [IAtomType.MuiButtonUnstyled]: dynamicImport(
    () => import('@mui/base/ButtonUnstyled'),
  ),
  [IAtomType.MuiCalendarPicker]: dynamicImport(
    () => import('@mui/lab/CalendarPicker'),
  ),
  [IAtomType.MuiCalendarPickerSkeleton]: dynamicImport(
    () => import('@mui/lab/CalendarPickerSkeleton'),
  ),
  [IAtomType.MuiCard]: dynamicImport(() => import('@mui/material/Card')),
  [IAtomType.MuiCardActionArea]: dynamicImport(
    () => import('@mui/material/CardActionArea'),
  ),
  [IAtomType.MuiCardActions]: dynamicImport(
    () => import('@mui/material/CardActions'),
  ),
  [IAtomType.MuiCardContent]: dynamicImport(
    () => import('@mui/material/CardContent'),
  ),
  [IAtomType.MuiCardHeader]: dynamicImport(
    () => import('@mui/material/CardHeader'),
  ),
  [IAtomType.MuiCardMedia]: dynamicImport(
    () => import('@mui/material/CardMedia'),
  ),
  [IAtomType.MuiCheckbox]: dynamicImport(
    () => import('@mui/material/Checkbox'),
  ),
  [IAtomType.MuiChip]: dynamicImport(() => import('@mui/material/Chip')),
  [IAtomType.MuiCircularProgress]: dynamicImport(
    () => import('@mui/material/CircularProgress'),
  ),
  [IAtomType.MuiClickAwayListener]: dynamicImport(
    () => import('@mui/material/ClickAwayListener'),
  ),
  // [AtomType.MuiClockPicker]: dynamicImport(() =>import('@mui/material/ClockPicker')), ??
  [IAtomType.MuiCollapse]: dynamicImport(
    () => import('@mui/material/Collapse'),
  ),
  [IAtomType.MuiContainer]: dynamicImport(
    () => import('@mui/material/Container'),
  ),
  [IAtomType.MuiCssBaseline]: dynamicImport(
    () => import('@mui/material/CssBaseline'),
  ),
  // [AtomType.MuiDataGrid]: dynamicImport(() =>import('@mui/x-data-grid')), // not working for some reason ,can't find @material-ui/core/badge?
  [IAtomType.MuiDatePicker]: dynamicImport(() => import('@mui/lab/DatePicker')),
  [IAtomType.MuiDateRangePicker]: dynamicImport(
    () => import('@mui/lab/DateRangePicker'),
  ),
  [IAtomType.MuiDateRangePickerDay]: dynamicImport(
    () => import('@mui/lab/DateRangePickerDay'),
  ),
  [IAtomType.MuiDateTimePicker]: dynamicImport(
    () => import('@mui/lab/DateTimePicker'),
  ),
  [IAtomType.MuiDesktopDatePicker]: dynamicImport(
    () => import('@mui/lab/DesktopDatePicker'),
  ),
  [IAtomType.MuiDesktopDateRangePicker]: dynamicImport(
    () => import('@mui/lab/DesktopDateRangePicker'),
  ),
  [IAtomType.MuiDesktopDateTimePicker]: dynamicImport(
    () => import('@mui/lab/DesktopDateTimePicker'),
  ),
  [IAtomType.MuiDesktopTimePicker]: dynamicImport(
    () => import('@mui/lab/DesktopTimePicker'),
  ),
  [IAtomType.MuiDialog]: dynamicImport(() => import('@mui/material/Dialog')),
  [IAtomType.MuiDialogActions]: dynamicImport(
    () => import('@mui/material/DialogActions'),
  ),
  [IAtomType.MuiDialogContent]: dynamicImport(
    () => import('@mui/material/DialogContent'),
  ),
  [IAtomType.MuiDialogContentText]: dynamicImport(
    () => import('@mui/material/DialogContentText'),
  ),
  [IAtomType.MuiDialogTitle]: dynamicImport(
    () => import('@mui/material/DialogTitle'),
  ),
  [IAtomType.MuiDivider]: dynamicImport(() => import('@mui/material/Divider')),
  [IAtomType.MuiDrawer]: dynamicImport(() => import('@mui/material/Drawer')),
  [IAtomType.MuiFab]: dynamicImport(() => import('@mui/material/Fab')),
  [IAtomType.MuiFade]: dynamicImport(() => import('@mui/material/Fade')),
  [IAtomType.MuiFilledInput]: dynamicImport(
    () => import('@mui/material/FilledInput'),
  ),
  [IAtomType.MuiFormControl]: dynamicImport(
    () => import('@mui/material/FormControl'),
  ),
  [IAtomType.MuiFormControlLabel]: dynamicImport(
    () => import('@mui/material/FormControlLabel'),
  ),
  [IAtomType.MuiFormControlUnstyled]: dynamicImport(
    () => import('@mui/base/FormControlUnstyled'),
  ),
  [IAtomType.MuiFormGroup]: dynamicImport(
    () => import('@mui/material/FormGroup'),
  ),
  [IAtomType.MuiFormHelperText]: dynamicImport(
    () => import('@mui/material/FormHelperText'),
  ),
  [IAtomType.MuiFormLabel]: dynamicImport(
    () => import('@mui/material/FormLabel'),
  ),
  [IAtomType.MuiGlobalStyles]: dynamicImport(
    () => import('@mui/material/GlobalStyles'),
  ),
  [IAtomType.MuiGrid]: dynamicImport(() => import('@mui/material/Grid')),
  [IAtomType.MuiGrow]: dynamicImport(() => import('@mui/material/Grow')),
  [IAtomType.MuiHidden]: dynamicImport(() => import('@mui/material/Hidden')),
  [IAtomType.MuiIcon]: dynamicImport(() => import('@mui/material/Icon')),
  [IAtomType.MuiIconButton]: dynamicImport(
    () => import('@mui/material/IconButton'),
  ),
  [IAtomType.MuiImageList]: dynamicImport(
    () => import('@mui/material/ImageList'),
  ),
  [IAtomType.MuiImageListItem]: dynamicImport(
    () => import('@mui/material/ImageListItem'),
  ),
  [IAtomType.MuiImageListItemBar]: dynamicImport(
    () => import('@mui/material/ImageListItemBar'),
  ),
  [IAtomType.MuiInput]: dynamicImport(() => import('@mui/material/Input')),
  [IAtomType.MuiInputAdornment]: dynamicImport(
    () => import('@mui/material/InputAdornment'),
  ),
  [IAtomType.MuiInputBase]: dynamicImport(
    () => import('@mui/material/InputBase'),
  ),
  [IAtomType.MuiInputLabel]: dynamicImport(
    () => import('@mui/material/InputLabel'),
  ),
  [IAtomType.MuiLinearProgress]: dynamicImport(
    () => import('@mui/material/LinearProgress'),
  ),
  [IAtomType.MuiLink]: dynamicImport(() => import('@mui/material/Link')),
  [IAtomType.MuiList]: dynamicImport(() => import('@mui/material/List')),
  [IAtomType.MuiListItem]: dynamicImport(
    () => import('@mui/material/ListItem'),
  ),
  [IAtomType.MuiListItemAvatar]: dynamicImport(
    () => import('@mui/material/ListItemAvatar'),
  ),
  [IAtomType.MuiListItemButton]: dynamicImport(
    () => import('@mui/material/ListItemButton'),
  ),
  [IAtomType.MuiListItemIcon]: dynamicImport(
    () => import('@mui/material/ListItemIcon'),
  ),
  [IAtomType.MuiListItemSecondaryAction]: dynamicImport(
    () => import('@mui/material/ListItemSecondaryAction'),
  ),
  [IAtomType.MuiListItemText]: dynamicImport(
    () => import('@mui/material/ListItemText'),
  ),
  [IAtomType.MuiListSubheader]: dynamicImport(
    () => import('@mui/material/ListSubheader'),
  ),
  [IAtomType.MuiLoadingButton]: dynamicImport(
    () => import('@mui/lab/LoadingButton'),
  ),
  [IAtomType.MuiMasonry]: dynamicImport(() => import('@mui/lab/Masonry')),
  [IAtomType.MuiMenu]: dynamicImport(() => import('@mui/material/Menu')),
  [IAtomType.MuiMenuItem]: dynamicImport(
    () => import('@mui/material/MenuItem'),
  ),
  [IAtomType.MuiMenuList]: dynamicImport(
    () => import('@mui/material/MenuList'),
  ),
  [IAtomType.MuiMobileDatePicker]: dynamicImport(
    () => import('@mui/lab/MobileDatePicker'),
  ),
  [IAtomType.MuiMobileDateRangePicker]: dynamicImport(
    () => import('@mui/lab/MobileDateRangePicker'),
  ),
  [IAtomType.MuiMobileDateTimePicker]: dynamicImport(
    () => import('@mui/lab/MobileDateTimePicker'),
  ),
  [IAtomType.MuiMobileStepper]: dynamicImport(
    () => import('@mui/material/MobileStepper'),
  ),
  [IAtomType.MuiMobileTimePicker]: dynamicImport(
    () => import('@mui/lab/MobileTimePicker'),
  ),
  [IAtomType.MuiModal]: dynamicImport(() => import('@mui/material/Modal')),
  [IAtomType.MuiModalUnstyled]: dynamicImport(
    () => import('@mui/base/ModalUnstyled'),
  ),
  [IAtomType.MuiMonthPicker]: dynamicImport(
    () => import('@mui/lab/MonthPicker'),
  ),
  [IAtomType.MuiNativeSelect]: dynamicImport(
    () => import('@mui/material/NativeSelect'),
  ),
  [IAtomType.MuiNoSsr]: dynamicImport(() => import('@mui/material/NoSsr')),
  [IAtomType.MuiOutlinedInput]: dynamicImport(
    () => import('@mui/material/OutlinedInput'),
  ),
  [IAtomType.MuiPagination]: dynamicImport(
    () => import('@mui/material/Pagination'),
  ),
  [IAtomType.MuiPaginationItem]: dynamicImport(
    () => import('@mui/material/PaginationItem'),
  ),
  [IAtomType.MuiPaper]: dynamicImport(() => import('@mui/material/Paper')),
  [IAtomType.MuiPickersDay]: dynamicImport(() => import('@mui/lab/PickersDay')),
  [IAtomType.MuiPopover]: dynamicImport(() => import('@mui/material/Popover')),
  [IAtomType.MuiPopper]: dynamicImport(() => import('@mui/material/Popper')),
  [IAtomType.MuiPortal]: dynamicImport(() => import('@mui/material/Portal')),
  [IAtomType.MuiRadio]: dynamicImport(() => import('@mui/material/Radio')),
  [IAtomType.MuiRadioGroup]: dynamicImport(
    () => import('@mui/material/RadioGroup'),
  ),
  [IAtomType.MuiRating]: dynamicImport(() => import('@mui/material/Rating')),
  [IAtomType.MuiScopedCssBaseline]: dynamicImport(
    () => import('@mui/material/ScopedCssBaseline'),
  ),
  [IAtomType.MuiSelect]: dynamicImport(() => import('@mui/material/Select')),
  [IAtomType.MuiSkeleton]: dynamicImport(
    () => import('@mui/material/Skeleton'),
  ),
  [IAtomType.MuiSlide]: dynamicImport(() => import('@mui/material/Slide')),
  [IAtomType.MuiSlider]: dynamicImport(() => import('@mui/material/Slider')),
  [IAtomType.MuiSliderUnstyled]: dynamicImport(
    () => import('@mui/base/SliderUnstyled'),
  ),
  [IAtomType.MuiSnackbar]: dynamicImport(
    () => import('@mui/material/Snackbar'),
  ),
  [IAtomType.MuiSnackbarContent]: dynamicImport(
    () => import('@mui/material/SnackbarContent'),
  ),
  [IAtomType.MuiSpeedDial]: dynamicImport(
    () => import('@mui/material/SpeedDial'),
  ),
  [IAtomType.MuiSpeedDialAction]: dynamicImport(
    () => import('@mui/material/SpeedDialAction'),
  ),
  [IAtomType.MuiSpeedDialIcon]: dynamicImport(
    () => import('@mui/material/SpeedDialIcon'),
  ),
  [IAtomType.MuiStack]: dynamicImport(() => import('@mui/material/Stack')),
  [IAtomType.MuiStaticDatePicker]: dynamicImport(
    () => import('@mui/lab/StaticDatePicker'),
  ),
  [IAtomType.MuiStaticDateRangePicker]: dynamicImport(
    () => import('@mui/lab/StaticDateRangePicker'),
  ),
  [IAtomType.MuiStaticDateTimePicker]: dynamicImport(
    () => import('@mui/lab/StaticDateTimePicker'),
  ),
  [IAtomType.MuiStaticTimePicker]: dynamicImport(
    () => import('@mui/lab/StaticTimePicker'),
  ),
  [IAtomType.MuiStep]: dynamicImport(() => import('@mui/material/Step')),
  [IAtomType.MuiStepButton]: dynamicImport(
    () => import('@mui/material/StepButton'),
  ),
  [IAtomType.MuiStepConnector]: dynamicImport(
    () => import('@mui/material/StepConnector'),
  ),
  [IAtomType.MuiStepContent]: dynamicImport(
    () => import('@mui/material/StepContent'),
  ),
  [IAtomType.MuiStepIcon]: dynamicImport(
    () => import('@mui/material/StepIcon'),
  ),
  [IAtomType.MuiStepLabel]: dynamicImport(
    () => import('@mui/material/StepLabel'),
  ),
  [IAtomType.MuiStepper]: dynamicImport(() => import('@mui/material/Stepper')),
  [IAtomType.MuiSvgIcon]: dynamicImport(() => import('@mui/material/SvgIcon')),
  [IAtomType.MuiSwipeableDrawer]: dynamicImport(
    () => import('@mui/material/SwipeableDrawer'),
  ),
  [IAtomType.MuiSwitch]: dynamicImport(() => import('@mui/material/Switch')),
  [IAtomType.MuiSwitchUnstyled]: dynamicImport(
    () => import('@mui/base/SwitchUnstyled'),
  ),
  [IAtomType.MuiTab]: dynamicImport(() => import('@mui/material/Tab')),
  [IAtomType.MuiTabContext]: dynamicImport(() => import('@mui/lab/TabContext')),
  [IAtomType.MuiTabList]: dynamicImport(() => import('@mui/lab/TabList')),
  [IAtomType.MuiTabPanel]: dynamicImport(() => import('@mui/lab/TabPanel')),
  [IAtomType.MuiTabScrollButton]: dynamicImport(
    () => import('@mui/material/TabScrollButton'),
  ),
  [IAtomType.MuiTable]: dynamicImport(() => import('@mui/material/Table')),
  [IAtomType.MuiTableBody]: dynamicImport(
    () => import('@mui/material/TableBody'),
  ),
  [IAtomType.MuiTableCell]: dynamicImport(
    () => import('@mui/material/TableCell'),
  ),
  [IAtomType.MuiTableContainer]: dynamicImport(
    () => import('@mui/material/TableContainer'),
  ),
  [IAtomType.MuiTableFooter]: dynamicImport(
    () => import('@mui/material/TableFooter'),
  ),
  [IAtomType.MuiTableHead]: dynamicImport(
    () => import('@mui/material/TableHead'),
  ),
  [IAtomType.MuiTablePagination]: dynamicImport(
    () => import('@mui/material/TablePagination'),
  ),
  [IAtomType.MuiTableRow]: dynamicImport(
    () => import('@mui/material/TableRow'),
  ),
  [IAtomType.MuiTableSortLabel]: dynamicImport(
    () => import('@mui/material/TableSortLabel'),
  ),
  [IAtomType.MuiTabs]: dynamicImport(() => import('@mui/material/Tabs')),
  [IAtomType.MuiTextField]: dynamicImport(
    () => import('@mui/material/TextField'),
  ),
  [IAtomType.MuiTextareaAutosize]: dynamicImport(
    () => import('@mui/material/TextareaAutosize'),
  ),
  [IAtomType.MuiTimePicker]: dynamicImport(() => import('@mui/lab/TimePicker')),
  [IAtomType.MuiTimeline]: dynamicImport(() => import('@mui/lab/Timeline')),
  [IAtomType.MuiTimelineConnector]: dynamicImport(
    () => import('@mui/lab/TimelineConnector'),
  ),
  [IAtomType.MuiTimelineContent]: dynamicImport(
    () => import('@mui/lab/TimelineContent'),
  ),
  [IAtomType.MuiTimelineDot]: dynamicImport(
    () => import('@mui/lab/TimelineDot'),
  ),
  [IAtomType.MuiTimelineItem]: dynamicImport(
    () => import('@mui/lab/TimelineItem'),
  ),
  [IAtomType.MuiTimelineOppositeContent]: dynamicImport(
    () => import('@mui/lab/TimelineOppositeContent'),
  ),
  [IAtomType.MuiTimelineSeparator]: dynamicImport(
    () => import('@mui/lab/TimelineSeparator'),
  ),
  [IAtomType.MuiToggleButton]: dynamicImport(
    () => import('@mui/material/ToggleButton'),
  ),
  [IAtomType.MuiToggleButtonGroup]: dynamicImport(
    () => import('@mui/material/ToggleButtonGroup'),
  ),
  [IAtomType.MuiToolbar]: dynamicImport(() => import('@mui/material/Toolbar')),
  [IAtomType.MuiTooltip]: dynamicImport(() => import('@mui/material/Tooltip')),
  [IAtomType.MuiTreeItem]: dynamicImport(() => import('@mui/lab/TreeItem')),
  [IAtomType.MuiTreeView]: dynamicImport(() => import('@mui/lab/TreeView')),
  [IAtomType.MuiTypography]: dynamicImport(
    () => import('@mui/material/Typography'),
  ),
  [IAtomType.MuiUnstableTrapFocus]: dynamicImport(
    () => import('@mui/material/Unstable_TrapFocus'),
  ),
  [IAtomType.MuiYearPicker]: dynamicImport(() => import('@mui/lab/YearPicker')),
  [IAtomType.MuiZoom]: dynamicImport(() => import('@mui/material/Zoom')),
}
