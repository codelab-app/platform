import { IAtomType } from '@codelab/shared/abstract/core'
import dynamic from 'next/dynamic'
import { AtomsRecord } from '../types'

export const muiAtoms: AtomsRecord = {
  [IAtomType.MuiAccordion]: dynamic(() => import('@mui/material/Accordion')),
  [IAtomType.MuiAccordionActions]: dynamic(
    () => import('@mui/material/AccordionActions'),
  ),
  [IAtomType.MuiAccordionDetails]: dynamic(
    () => import('@mui/material/AccordionDetails'),
  ),
  [IAtomType.MuiAccordionSummary]: dynamic(
    () => import('@mui/material/AccordionSummary'),
  ),
  [IAtomType.MuiAlert]: dynamic(() => import('@mui/material/Alert')),
  [IAtomType.MuiAlertTitle]: dynamic(() => import('@mui/material/AlertTitle')),
  [IAtomType.MuiAppBar]: dynamic(() => import('@mui/material/AppBar')),
  [IAtomType.MuiAutocomplete]: dynamic(
    () => import('@mui/material/Autocomplete'),
  ),
  [IAtomType.MuiAvatar]: dynamic(() => import('@mui/material/Avatar')),
  [IAtomType.MuiAvatarGroup]: dynamic(
    () => import('@mui/material/AvatarGroup'),
  ),
  [IAtomType.MuiBackdrop]: dynamic(() => import('@mui/material/Backdrop')),
  [IAtomType.MuiBadge]: dynamic(() => import('@mui/material/Badge')),
  [IAtomType.MuiBadgeUnstyled]: dynamic(
    () => import('@mui/base/BadgeUnstyled'),
  ),
  [IAtomType.MuiBottomNavigation]: dynamic(
    () => import('@mui/material/BottomNavigation'),
  ),
  [IAtomType.MuiBottomNavigationAction]: dynamic(
    () => import('@mui/material/BottomNavigationAction'),
  ),
  [IAtomType.MuiBox]: dynamic(() => import('@mui/material/Box')),
  [IAtomType.MuiBreadcrumbs]: dynamic(
    () => import('@mui/material/Breadcrumbs'),
  ),
  [IAtomType.MuiButton]: dynamic(() => import('@mui/material/Button')),
  [IAtomType.MuiButtonBase]: dynamic(() => import('@mui/material/ButtonBase')),
  [IAtomType.MuiButtonGroup]: dynamic(
    () => import('@mui/material/ButtonGroup'),
  ),
  [IAtomType.MuiButtonUnstyled]: dynamic(
    () => import('@mui/base/ButtonUnstyled'),
  ),
  [IAtomType.MuiCalendarPicker]: dynamic(
    () => import('@mui/lab/CalendarPicker'),
  ),
  [IAtomType.MuiCalendarPickerSkeleton]: dynamic(
    () => import('@mui/lab/CalendarPickerSkeleton'),
  ),
  [IAtomType.MuiCard]: dynamic(() => import('@mui/material/Card')),
  [IAtomType.MuiCardActionArea]: dynamic(
    () => import('@mui/material/CardActionArea'),
  ),
  [IAtomType.MuiCardActions]: dynamic(
    () => import('@mui/material/CardActions'),
  ),
  [IAtomType.MuiCardContent]: dynamic(
    () => import('@mui/material/CardContent'),
  ),
  [IAtomType.MuiCardHeader]: dynamic(() => import('@mui/material/CardHeader')),
  [IAtomType.MuiCardMedia]: dynamic(() => import('@mui/material/CardMedia')),
  [IAtomType.MuiCheckbox]: dynamic(() => import('@mui/material/Checkbox')),
  [IAtomType.MuiChip]: dynamic(() => import('@mui/material/Chip')),
  [IAtomType.MuiCircularProgress]: dynamic(
    () => import('@mui/material/CircularProgress'),
  ),
  [IAtomType.MuiClickAwayListener]: dynamic(
    () => import('@mui/material/ClickAwayListener'),
  ),
  // [AtomType.MuiClockPicker]: dynamic(() =>import('@mui/material/ClockPicker')), ??
  [IAtomType.MuiCollapse]: dynamic(() => import('@mui/material/Collapse')),
  [IAtomType.MuiContainer]: dynamic(() => import('@mui/material/Container')),
  [IAtomType.MuiCssBaseline]: dynamic(
    () => import('@mui/material/CssBaseline'),
  ),
  // [AtomType.MuiDataGrid]: dynamic(() =>import('@mui/x-data-grid')), // not working for some reason ,can't find @material-ui/core/badge?
  [IAtomType.MuiDatePicker]: dynamic(() =>
    import('@mui/x-date-pickers/DatePicker').then((x) => x.DatePicker as any),
  ),
  [IAtomType.MuiDateRangePicker]: dynamic(
    () => import('@mui/lab/DateRangePicker'),
  ),
  [IAtomType.MuiDateRangePickerDay]: dynamic(
    () => import('@mui/lab/DateRangePickerDay'),
  ),
  [IAtomType.MuiDateTimePicker]: dynamic(
    () => import('@mui/lab/DateTimePicker'),
  ),
  [IAtomType.MuiDesktopDatePicker]: dynamic(
    () => import('@mui/lab/DesktopDatePicker'),
  ),
  [IAtomType.MuiDesktopDateRangePicker]: dynamic(
    () => import('@mui/lab/DesktopDateRangePicker'),
  ),
  [IAtomType.MuiDesktopDateTimePicker]: dynamic(
    () => import('@mui/lab/DesktopDateTimePicker'),
  ),
  [IAtomType.MuiDesktopTimePicker]: dynamic(
    () => import('@mui/lab/DesktopTimePicker'),
  ),
  [IAtomType.MuiDialog]: dynamic(() => import('@mui/material/Dialog')),
  [IAtomType.MuiDialogActions]: dynamic(
    () => import('@mui/material/DialogActions'),
  ),
  [IAtomType.MuiDialogContent]: dynamic(
    () => import('@mui/material/DialogContent'),
  ),
  [IAtomType.MuiDialogContentText]: dynamic(
    () => import('@mui/material/DialogContentText'),
  ),
  [IAtomType.MuiDialogTitle]: dynamic(
    () => import('@mui/material/DialogTitle'),
  ),
  [IAtomType.MuiDivider]: dynamic(() => import('@mui/material/Divider')),
  [IAtomType.MuiDrawer]: dynamic(() => import('@mui/material/Drawer')),
  [IAtomType.MuiFab]: dynamic(() => import('@mui/material/Fab')),
  [IAtomType.MuiFade]: dynamic(() => import('@mui/material/Fade')),
  [IAtomType.MuiFilledInput]: dynamic(
    () => import('@mui/material/FilledInput'),
  ),
  [IAtomType.MuiFormControl]: dynamic(
    () => import('@mui/material/FormControl'),
  ),
  [IAtomType.MuiFormControlLabel]: dynamic(
    () => import('@mui/material/FormControlLabel'),
  ),
  [IAtomType.MuiFormControlUnstyled]: dynamic(
    () => import('@mui/base/FormControlUnstyled'),
  ),
  [IAtomType.MuiFormGroup]: dynamic(() => import('@mui/material/FormGroup')),
  [IAtomType.MuiFormHelperText]: dynamic(
    () => import('@mui/material/FormHelperText'),
  ),
  [IAtomType.MuiFormLabel]: dynamic(() => import('@mui/material/FormLabel')),
  [IAtomType.MuiGlobalStyles]: dynamic(
    () => import('@mui/material/GlobalStyles'),
  ),
  [IAtomType.MuiGrid]: dynamic(() => import('@mui/material/Grid')),
  [IAtomType.MuiGrow]: dynamic(() => import('@mui/material/Grow')),
  [IAtomType.MuiHidden]: dynamic(() => import('@mui/material/Hidden')),
  // dynamic causes jest tests to fail
  // Size too large, comment out for now
  // [IAtomType.MuiIcon]: import('@codelab/frontend/platform/atoms').then(
  //   (mod) => mod.MuiIcon,
  // ) as any,
  [IAtomType.MuiIconButton]: dynamic(() => import('@mui/material/IconButton')),
  [IAtomType.MuiImageList]: dynamic(() => import('@mui/material/ImageList')),
  [IAtomType.MuiImageListItem]: dynamic(
    () => import('@mui/material/ImageListItem'),
  ),
  [IAtomType.MuiImageListItemBar]: dynamic(
    () => import('@mui/material/ImageListItemBar'),
  ),
  [IAtomType.MuiInput]: dynamic(() => import('@mui/material/Input')),
  [IAtomType.MuiInputAdornment]: dynamic(
    () => import('@mui/material/InputAdornment'),
  ),
  [IAtomType.MuiInputBase]: dynamic(() => import('@mui/material/InputBase')),
  [IAtomType.MuiInputLabel]: dynamic(() => import('@mui/material/InputLabel')),
  [IAtomType.MuiLinearProgress]: dynamic(
    () => import('@mui/material/LinearProgress'),
  ),
  [IAtomType.MuiLink]: dynamic(() => import('@mui/material/Link')),
  [IAtomType.MuiList]: dynamic(() => import('@mui/material/List')),
  [IAtomType.MuiListItem]: dynamic(() => import('@mui/material/ListItem')),
  [IAtomType.MuiListItemAvatar]: dynamic(
    () => import('@mui/material/ListItemAvatar'),
  ),
  [IAtomType.MuiListItemButton]: dynamic(
    () => import('@mui/material/ListItemButton'),
  ),
  [IAtomType.MuiListItemIcon]: dynamic(
    () => import('@mui/material/ListItemIcon'),
  ),
  [IAtomType.MuiListItemSecondaryAction]: dynamic(
    () => import('@mui/material/ListItemSecondaryAction'),
  ),
  [IAtomType.MuiListItemText]: dynamic(
    () => import('@mui/material/ListItemText'),
  ),
  [IAtomType.MuiListSubheader]: dynamic(
    () => import('@mui/material/ListSubheader'),
  ),
  [IAtomType.MuiLoadingButton]: dynamic(() => import('@mui/lab/LoadingButton')),
  [IAtomType.MuiMasonry]: dynamic(() => import('@mui/lab/Masonry')),
  [IAtomType.MuiMenu]: dynamic(() => import('@mui/material/Menu')),
  [IAtomType.MuiMenuItem]: dynamic(() => import('@mui/material/MenuItem')),
  [IAtomType.MuiMenuList]: dynamic(() => import('@mui/material/MenuList')),
  [IAtomType.MuiMobileDatePicker]: dynamic(
    () => import('@mui/lab/MobileDatePicker'),
  ),
  [IAtomType.MuiMobileDateRangePicker]: dynamic(
    () => import('@mui/lab/MobileDateRangePicker'),
  ),
  [IAtomType.MuiMobileDateTimePicker]: dynamic(
    () => import('@mui/lab/MobileDateTimePicker'),
  ),
  [IAtomType.MuiMobileStepper]: dynamic(
    () => import('@mui/material/MobileStepper'),
  ),
  [IAtomType.MuiMobileTimePicker]: dynamic(
    () => import('@mui/lab/MobileTimePicker'),
  ),
  [IAtomType.MuiModal]: dynamic(() => import('@mui/material/Modal')),
  [IAtomType.MuiModalUnstyled]: dynamic(
    () => import('@mui/base/ModalUnstyled'),
  ),
  [IAtomType.MuiMonthPicker]: dynamic(() => import('@mui/lab/MonthPicker')),
  [IAtomType.MuiNativeSelect]: dynamic(
    () => import('@mui/material/NativeSelect'),
  ),
  [IAtomType.MuiNoSsr]: dynamic(() => import('@mui/material/NoSsr')),
  [IAtomType.MuiOutlinedInput]: dynamic(
    () => import('@mui/material/OutlinedInput'),
  ),
  [IAtomType.MuiPagination]: dynamic(() => import('@mui/material/Pagination')),
  [IAtomType.MuiPaginationItem]: dynamic(
    () => import('@mui/material/PaginationItem'),
  ),
  [IAtomType.MuiPaper]: dynamic(() => import('@mui/material/Paper')),
  [IAtomType.MuiPickersDay]: dynamic(() => import('@mui/lab/PickersDay')),
  [IAtomType.MuiPopover]: dynamic(() => import('@mui/material/Popover')),
  [IAtomType.MuiPopper]: dynamic(() => import('@mui/material/Popper')),
  [IAtomType.MuiPortal]: dynamic(() => import('@mui/material/Portal')),
  [IAtomType.MuiRadio]: dynamic(() => import('@mui/material/Radio')),
  [IAtomType.MuiRadioGroup]: dynamic(() => import('@mui/material/RadioGroup')),
  [IAtomType.MuiRating]: dynamic(() => import('@mui/material/Rating')),
  [IAtomType.MuiScopedCssBaseline]: dynamic(
    () => import('@mui/material/ScopedCssBaseline'),
  ),
  [IAtomType.MuiSelect]: dynamic(() => import('@mui/material/Select')),
  [IAtomType.MuiSkeleton]: dynamic(() => import('@mui/material/Skeleton')),
  [IAtomType.MuiSlide]: dynamic(() => import('@mui/material/Slide')),
  [IAtomType.MuiSlider]: dynamic(() => import('@mui/material/Slider')),
  [IAtomType.MuiSliderUnstyled]: dynamic(
    () => import('@mui/base/SliderUnstyled'),
  ),
  [IAtomType.MuiSnackbar]: dynamic(() => import('@mui/material/Snackbar')),
  [IAtomType.MuiSnackbarContent]: dynamic(
    () => import('@mui/material/SnackbarContent'),
  ),
  [IAtomType.MuiSpeedDial]: dynamic(() => import('@mui/material/SpeedDial')),
  [IAtomType.MuiSpeedDialAction]: dynamic(
    () => import('@mui/material/SpeedDialAction'),
  ),
  [IAtomType.MuiSpeedDialIcon]: dynamic(
    () => import('@mui/material/SpeedDialIcon'),
  ),
  [IAtomType.MuiStack]: dynamic(() => import('@mui/material/Stack')),
  [IAtomType.MuiStaticDatePicker]: dynamic(
    () => import('@mui/lab/StaticDatePicker'),
  ),
  [IAtomType.MuiStaticDateRangePicker]: dynamic(
    () => import('@mui/lab/StaticDateRangePicker'),
  ),
  [IAtomType.MuiStaticDateTimePicker]: dynamic(
    () => import('@mui/lab/StaticDateTimePicker'),
  ),
  [IAtomType.MuiStaticTimePicker]: dynamic(
    () => import('@mui/lab/StaticTimePicker'),
  ),
  [IAtomType.MuiStep]: dynamic(() => import('@mui/material/Step')),
  [IAtomType.MuiStepButton]: dynamic(() => import('@mui/material/StepButton')),
  [IAtomType.MuiStepConnector]: dynamic(
    () => import('@mui/material/StepConnector'),
  ),
  [IAtomType.MuiStepContent]: dynamic(
    () => import('@mui/material/StepContent'),
  ),
  [IAtomType.MuiStepIcon]: dynamic(() => import('@mui/material/StepIcon')),
  [IAtomType.MuiStepLabel]: dynamic(() => import('@mui/material/StepLabel')),
  [IAtomType.MuiStepper]: dynamic(() => import('@mui/material/Stepper')),
  [IAtomType.MuiSvgIcon]: dynamic(() => import('@mui/material/SvgIcon')),
  [IAtomType.MuiSwipeableDrawer]: dynamic(
    () => import('@mui/material/SwipeableDrawer'),
  ),
  [IAtomType.MuiSwitch]: dynamic(() => import('@mui/material/Switch')),
  [IAtomType.MuiSwitchUnstyled]: dynamic(
    () => import('@mui/base/SwitchUnstyled'),
  ),
  [IAtomType.MuiTab]: dynamic(() => import('@mui/material/Tab')),
  [IAtomType.MuiTabContext]: dynamic(() => import('@mui/lab/TabContext')),
  [IAtomType.MuiTabList]: dynamic(() => import('@mui/lab/TabList')),
  [IAtomType.MuiTabPanel]: dynamic(() => import('@mui/lab/TabPanel')),
  [IAtomType.MuiTabScrollButton]: dynamic(
    () => import('@mui/material/TabScrollButton'),
  ),
  [IAtomType.MuiTable]: dynamic(() => import('@mui/material/Table')),
  [IAtomType.MuiTableBody]: dynamic(() => import('@mui/material/TableBody')),
  [IAtomType.MuiTableCell]: dynamic(() => import('@mui/material/TableCell')),
  [IAtomType.MuiTableContainer]: dynamic(
    () => import('@mui/material/TableContainer'),
  ),
  [IAtomType.MuiTableFooter]: dynamic(
    () => import('@mui/material/TableFooter'),
  ),
  [IAtomType.MuiTableHead]: dynamic(() => import('@mui/material/TableHead')),
  [IAtomType.MuiTablePagination]: dynamic(
    () => import('@mui/material/TablePagination'),
  ),
  [IAtomType.MuiTableRow]: dynamic(() => import('@mui/material/TableRow')),
  [IAtomType.MuiTableSortLabel]: dynamic(
    () => import('@mui/material/TableSortLabel'),
  ),
  [IAtomType.MuiTabs]: dynamic(() => import('@mui/material/Tabs')),
  [IAtomType.MuiTextField]: dynamic(() => import('@mui/material/TextField')),
  [IAtomType.MuiTextareaAutosize]: dynamic(
    () => import('@mui/material/TextareaAutosize'),
  ),
  [IAtomType.MuiTimePicker]: dynamic(() => import('@mui/lab/TimePicker')),
  [IAtomType.MuiTimeline]: dynamic(() => import('@mui/lab/Timeline')),
  [IAtomType.MuiTimelineConnector]: dynamic(
    () => import('@mui/lab/TimelineConnector'),
  ),
  [IAtomType.MuiTimelineContent]: dynamic(
    () => import('@mui/lab/TimelineContent'),
  ),
  [IAtomType.MuiTimelineDot]: dynamic(() => import('@mui/lab/TimelineDot')),
  [IAtomType.MuiTimelineItem]: dynamic(() => import('@mui/lab/TimelineItem')),
  [IAtomType.MuiTimelineOppositeContent]: dynamic(
    () => import('@mui/lab/TimelineOppositeContent'),
  ),
  [IAtomType.MuiTimelineSeparator]: dynamic(
    () => import('@mui/lab/TimelineSeparator'),
  ),
  [IAtomType.MuiToggleButton]: dynamic(
    () => import('@mui/material/ToggleButton'),
  ),
  [IAtomType.MuiToggleButtonGroup]: dynamic(
    () => import('@mui/material/ToggleButtonGroup'),
  ),
  [IAtomType.MuiToolbar]: dynamic(() => import('@mui/material/Toolbar')),
  [IAtomType.MuiTooltip]: dynamic(() => import('@mui/material/Tooltip')),
  [IAtomType.MuiTreeItem]: dynamic(() => import('@mui/lab/TreeItem')),
  [IAtomType.MuiTreeView]: dynamic(() => import('@mui/lab/TreeView')),
  [IAtomType.MuiTypography]: dynamic(() => import('@mui/material/Typography')),
  [IAtomType.MuiUnstableTrapFocus]: dynamic(
    () => import('@mui/material/Unstable_TrapFocus'),
  ),
  [IAtomType.MuiYearPicker]: dynamic(() => import('@mui/lab/YearPicker')),
  [IAtomType.MuiZoom]: dynamic(() => import('@mui/material/Zoom')),
}
