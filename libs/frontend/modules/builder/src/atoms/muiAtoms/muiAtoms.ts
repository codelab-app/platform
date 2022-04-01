import { AtomType } from '@codelab/shared/abstract/core'
import Input from '@mui/material/Input'
import dynamic from 'next/dynamic'
import { AtomsRecord } from '../types'

export const muiAtoms: AtomsRecord = {
  [AtomType.MuiAccordion]: dynamic(() => import('@mui/material/Accordion')),
  [AtomType.MuiAccordionActions]: dynamic(
    () => import('@mui/material/AccordionActions'),
  ),
  [AtomType.MuiAccordionDetails]: dynamic(
    () => import('@mui/material/AccordionDetails'),
  ),
  [AtomType.MuiAccordionSummary]: dynamic(
    () => import('@mui/material/AccordionSummary'),
  ),
  [AtomType.MuiAlert]: dynamic(() => import('@mui/material/Alert')),
  [AtomType.MuiAlertTitle]: dynamic(() => import('@mui/material/AlertTitle')),
  [AtomType.MuiAppBar]: dynamic(() => import('@mui/material/AppBar')),
  [AtomType.MuiAutocomplete]: dynamic(
    () => import('@mui/material/Autocomplete'),
  ),
  [AtomType.MuiAvatar]: dynamic(() => import('@mui/material/Avatar')),
  [AtomType.MuiAvatarGroup]: dynamic(() => import('@mui/material/AvatarGroup')),
  [AtomType.MuiBackdrop]: dynamic(() => import('@mui/material/Backdrop')),
  [AtomType.MuiBackdropUnstyled]: dynamic(
    () => import('@mui/core/BackdropUnstyled'),
  ),
  [AtomType.MuiBadge]: dynamic(() => import('@mui/material/Badge')),
  [AtomType.MuiBadgeUnstyled]: dynamic(() => import('@mui/core/BadgeUnstyled')),
  [AtomType.MuiBottomNavigation]: dynamic(
    () => import('@mui/material/BottomNavigation'),
  ),
  [AtomType.MuiBottomNavigationAction]: dynamic(
    () => import('@mui/material/BottomNavigationAction'),
  ),
  [AtomType.MuiBox]: dynamic(() => import('@mui/material/Box')),
  [AtomType.MuiBreadcrumbs]: dynamic(() => import('@mui/material/Breadcrumbs')),
  [AtomType.MuiButton]: dynamic(() => import('@mui/material/Button')),
  [AtomType.MuiButtonBase]: dynamic(() => import('@mui/material/ButtonBase')),
  [AtomType.MuiButtonGroup]: dynamic(() => import('@mui/material/ButtonGroup')),
  [AtomType.MuiButtonUnstyled]: dynamic(
    () => import('@mui/core/ButtonUnstyled'),
  ),
  [AtomType.MuiCalendarPicker]: dynamic(
    () => import('@mui/lab/CalendarPicker'),
  ),
  [AtomType.MuiCalendarPickerSkeleton]: dynamic(
    () => import('@mui/lab/CalendarPickerSkeleton'),
  ),
  [AtomType.MuiCard]: dynamic(() => import('@mui/material/Card')),
  [AtomType.MuiCardActionArea]: dynamic(
    () => import('@mui/material/CardActionArea'),
  ),
  [AtomType.MuiCardActions]: dynamic(() => import('@mui/material/CardActions')),
  [AtomType.MuiCardContent]: dynamic(() => import('@mui/material/CardContent')),
  [AtomType.MuiCardHeader]: dynamic(() => import('@mui/material/CardHeader')),
  [AtomType.MuiCardMedia]: dynamic(() => import('@mui/material/CardMedia')),
  [AtomType.MuiCheckbox]: dynamic(() => import('@mui/material/Checkbox')),
  [AtomType.MuiChip]: dynamic(() => import('@mui/material/Chip')),
  [AtomType.MuiCircularProgress]: dynamic(
    () => import('@mui/material/CircularProgress'),
  ),
  [AtomType.MuiClickAwayListener]: dynamic(
    () => import('@mui/material/ClickAwayListener'),
  ),
  // [AtomType.MuiClockPicker]: dynamic(() => import('@mui/material/ClockPicker')), ??
  [AtomType.MuiCollapse]: dynamic(() => import('@mui/material/Collapse')),
  [AtomType.MuiContainer]: dynamic(() => import('@mui/material/Container')),
  [AtomType.MuiCssBaseline]: dynamic(() => import('@mui/material/CssBaseline')),
  // [AtomType.MuiDataGrid]: dynamic(() => import('@mui/x-data-grid')), // not working for some reason ,can't find @material-ui/core/badge?
  [AtomType.MuiDatePicker]: dynamic(() => import('@mui/lab/DatePicker')),
  [AtomType.MuiDateRangePicker]: dynamic(
    () => import('@mui/lab/DateRangePicker') as any,
  ),
  [AtomType.MuiDateRangePickerDay]: dynamic(
    () => import('@mui/lab/DateRangePickerDay'),
  ),
  [AtomType.MuiDateTimePicker]: dynamic(
    () => import('@mui/lab/DateTimePicker'),
  ),
  [AtomType.MuiDesktopDatePicker]: dynamic(
    () => import('@mui/lab/DesktopDatePicker'),
  ),
  [AtomType.MuiDesktopDateRangePicker]: dynamic(
    () => import('@mui/lab/DesktopDateRangePicker') as any,
  ),
  [AtomType.MuiDesktopDateTimePicker]: dynamic(
    () => import('@mui/lab/DesktopDateTimePicker'),
  ),
  [AtomType.MuiDesktopTimePicker]: dynamic(
    () => import('@mui/lab/DesktopTimePicker'),
  ),
  [AtomType.MuiDialog]: dynamic(() => import('@mui/material/Dialog')),
  [AtomType.MuiDialogActions]: dynamic(
    () => import('@mui/material/DialogActions'),
  ),
  [AtomType.MuiDialogContent]: dynamic(
    () => import('@mui/material/DialogContent'),
  ),
  [AtomType.MuiDialogContentText]: dynamic(
    () => import('@mui/material/DialogContentText'),
  ),
  [AtomType.MuiDialogTitle]: dynamic(() => import('@mui/material/DialogTitle')),
  [AtomType.MuiDivider]: dynamic(() => import('@mui/material/Divider')),
  [AtomType.MuiDrawer]: dynamic(() => import('@mui/material/Drawer')),
  [AtomType.MuiFab]: dynamic(() => import('@mui/material/Fab')),
  [AtomType.MuiFade]: dynamic(() => import('@mui/material/Fade')),
  [AtomType.MuiFilledInput]: dynamic(() => import('@mui/material/FilledInput')),
  [AtomType.MuiFormControl]: dynamic(() => import('@mui/material/FormControl')),
  [AtomType.MuiFormControlLabel]: dynamic(
    () => import('@mui/material/FormControlLabel'),
  ),
  [AtomType.MuiFormControlUnstyled]: dynamic(
    () => import('@mui/core/FormControlUnstyled'),
  ),
  [AtomType.MuiFormGroup]: dynamic(() => import('@mui/material/FormGroup')),
  [AtomType.MuiFormHelperText]: dynamic(
    () => import('@mui/material/FormHelperText'),
  ),
  [AtomType.MuiFormLabel]: dynamic(() => import('@mui/material/FormLabel')),
  [AtomType.MuiGlobalStyles]: dynamic(
    () => import('@mui/material/GlobalStyles'),
  ),
  [AtomType.MuiGrid]: dynamic(() => import('@mui/material/Grid')),
  [AtomType.MuiGrow]: dynamic(() => import('@mui/material/Grow')),
  [AtomType.MuiHidden]: dynamic(() => import('@mui/material/Hidden')),
  [AtomType.MuiIcon]: dynamic(() => import('@mui/material/Icon')),
  [AtomType.MuiIconButton]: dynamic(() => import('@mui/material/IconButton')),
  [AtomType.MuiImageList]: dynamic(() => import('@mui/material/ImageList')),
  [AtomType.MuiImageListItem]: dynamic(
    () => import('@mui/material/ImageListItem'),
  ),
  [AtomType.MuiImageListItemBar]: dynamic(
    () => import('@mui/material/ImageListItemBar'),
  ),
  [AtomType.MuiInput]: Input,
  [AtomType.MuiInputAdornment]: dynamic(
    () => import('@mui/material/InputAdornment'),
  ),
  [AtomType.MuiInputBase]: dynamic(() => import('@mui/material/InputBase')),
  [AtomType.MuiInputLabel]: dynamic(() => import('@mui/material/InputLabel')),
  [AtomType.MuiLinearProgress]: dynamic(
    () => import('@mui/material/LinearProgress'),
  ),
  [AtomType.MuiLink]: dynamic(() => import('@mui/material/Link')),
  [AtomType.MuiList]: dynamic(() => import('@mui/material/List')),
  [AtomType.MuiListItem]: dynamic(() => import('@mui/material/ListItem')),
  [AtomType.MuiListItemAvatar]: dynamic(
    () => import('@mui/material/ListItemAvatar'),
  ),
  [AtomType.MuiListItemButton]: dynamic(
    () => import('@mui/material/ListItemButton'),
  ),
  [AtomType.MuiListItemIcon]: dynamic(
    () => import('@mui/material/ListItemIcon'),
  ),
  [AtomType.MuiListItemSecondaryAction]: dynamic(
    () => import('@mui/material/ListItemSecondaryAction'),
  ),
  [AtomType.MuiListItemText]: dynamic(
    () => import('@mui/material/ListItemText'),
  ),
  [AtomType.MuiListSubheader]: dynamic(
    () => import('@mui/material/ListSubheader'),
  ),
  [AtomType.MuiLoadingButton]: dynamic(() => import('@mui/lab/LoadingButton')),
  [AtomType.MuiMasonry]: dynamic(() => import('@mui/lab/Masonry')),
  [AtomType.MuiMenu]: dynamic(() => import('@mui/material/Menu')),
  [AtomType.MuiMenuItem]: dynamic(() => import('@mui/material/MenuItem')),
  [AtomType.MuiMenuList]: dynamic(() => import('@mui/material/MenuList')),
  [AtomType.MuiMobileDatePicker]: dynamic(
    () => import('@mui/lab/MobileDatePicker'),
  ),
  [AtomType.MuiMobileDateRangePicker]: dynamic(
    () => import('@mui/lab/MobileDateRangePicker') as any,
  ),
  [AtomType.MuiMobileDateTimePicker]: dynamic(
    () => import('@mui/lab/MobileDateTimePicker'),
  ),
  [AtomType.MuiMobileStepper]: dynamic(
    () => import('@mui/material/MobileStepper'),
  ),
  [AtomType.MuiMobileTimePicker]: dynamic(
    () => import('@mui/lab/MobileTimePicker'),
  ),
  [AtomType.MuiModal]: dynamic(() => import('@mui/material/Modal')),
  [AtomType.MuiModalUnstyled]: dynamic(() => import('@mui/core/ModalUnstyled')),
  [AtomType.MuiMonthPicker]: dynamic(() => import('@mui/lab/MonthPicker')),
  [AtomType.MuiNativeSelect]: dynamic(
    () => import('@mui/material/NativeSelect'),
  ),
  [AtomType.MuiNoSsr]: dynamic(() => import('@mui/material/NoSsr')),
  [AtomType.MuiOutlinedInput]: dynamic(
    () => import('@mui/material/OutlinedInput'),
  ),
  [AtomType.MuiPagination]: dynamic(() => import('@mui/material/Pagination')),
  [AtomType.MuiPaginationItem]: dynamic(
    () => import('@mui/material/PaginationItem'),
  ),
  [AtomType.MuiPaper]: dynamic(() => import('@mui/material/Paper')),
  [AtomType.MuiPickersDay]: dynamic(() => import('@mui/lab/PickersDay')),
  [AtomType.MuiPopover]: dynamic(() => import('@mui/material/Popover')),
  [AtomType.MuiPopper]: dynamic(() => import('@mui/material/Popper')),
  [AtomType.MuiPortal]: dynamic(() => import('@mui/material/Portal')),
  [AtomType.MuiRadio]: dynamic(() => import('@mui/material/Radio')),
  [AtomType.MuiRadioGroup]: dynamic(() => import('@mui/material/RadioGroup')),
  [AtomType.MuiRating]: dynamic(() => import('@mui/material/Rating')),
  [AtomType.MuiScopedCssBaseline]: dynamic(
    () => import('@mui/material/ScopedCssBaseline'),
  ),
  [AtomType.MuiSelect]: dynamic(() => import('@mui/material/Select')),
  [AtomType.MuiSkeleton]: dynamic(() => import('@mui/material/Skeleton')),
  [AtomType.MuiSlide]: dynamic(() => import('@mui/material/Slide')),
  [AtomType.MuiSlider]: dynamic(() => import('@mui/material/Slider')),
  [AtomType.MuiSliderUnstyled]: dynamic(
    () => import('@mui/core/SliderUnstyled'),
  ),
  [AtomType.MuiSnackbar]: dynamic(() => import('@mui/material/Snackbar')),
  [AtomType.MuiSnackbarContent]: dynamic(
    () => import('@mui/material/SnackbarContent'),
  ),
  [AtomType.MuiSpeedDial]: dynamic(() => import('@mui/material/SpeedDial')),
  [AtomType.MuiSpeedDialAction]: dynamic(
    () => import('@mui/material/SpeedDialAction'),
  ),
  [AtomType.MuiSpeedDialIcon]: dynamic(
    () => import('@mui/material/SpeedDialIcon'),
  ),
  [AtomType.MuiStack]: dynamic(() => import('@mui/material/Stack')),
  [AtomType.MuiStaticDatePicker]: dynamic(
    () => import('@mui/lab/StaticDatePicker'),
  ),
  [AtomType.MuiStaticDateRangePicker]: dynamic(
    () => import('@mui/lab/StaticDateRangePicker') as any,
  ),
  [AtomType.MuiStaticDateTimePicker]: dynamic(
    () => import('@mui/lab/StaticDateTimePicker'),
  ),
  [AtomType.MuiStaticTimePicker]: dynamic(
    () => import('@mui/lab/StaticTimePicker'),
  ),
  [AtomType.MuiStep]: dynamic(() => import('@mui/material/Step')),
  [AtomType.MuiStepButton]: dynamic(() => import('@mui/material/StepButton')),
  [AtomType.MuiStepConnector]: dynamic(
    () => import('@mui/material/StepConnector'),
  ),
  [AtomType.MuiStepContent]: dynamic(() => import('@mui/material/StepContent')),
  [AtomType.MuiStepIcon]: dynamic(() => import('@mui/material/StepIcon')),
  [AtomType.MuiStepLabel]: dynamic(() => import('@mui/material/StepLabel')),
  [AtomType.MuiStepper]: dynamic(() => import('@mui/material/Stepper')),
  [AtomType.MuiSvgIcon]: dynamic(() => import('@mui/material/SvgIcon')),
  [AtomType.MuiSwipeableDrawer]: dynamic(
    () => import('@mui/material/SwipeableDrawer'),
  ),
  [AtomType.MuiSwitch]: dynamic(() => import('@mui/material/Switch')),
  [AtomType.MuiSwitchUnstyled]: dynamic(
    () => import('@mui/core/SwitchUnstyled'),
  ),
  [AtomType.MuiTab]: dynamic(() => import('@mui/material/Tab')),
  [AtomType.MuiTabContext]: dynamic(() => import('@mui/lab/TabContext')),
  [AtomType.MuiTabList]: dynamic(() => import('@mui/lab/TabList')),
  [AtomType.MuiTabPanel]: dynamic(() => import('@mui/lab/TabPanel')),
  [AtomType.MuiTabScrollButton]: dynamic(
    () => import('@mui/material/TabScrollButton'),
  ),
  [AtomType.MuiTable]: dynamic(() => import('@mui/material/Table')),
  [AtomType.MuiTableBody]: dynamic(() => import('@mui/material/TableBody')),
  [AtomType.MuiTableCell]: dynamic(() => import('@mui/material/TableCell')),
  [AtomType.MuiTableContainer]: dynamic(
    () => import('@mui/material/TableContainer'),
  ),
  [AtomType.MuiTableFooter]: dynamic(() => import('@mui/material/TableFooter')),
  [AtomType.MuiTableHead]: dynamic(() => import('@mui/material/TableHead')),
  [AtomType.MuiTablePagination]: dynamic(
    () => import('@mui/material/TablePagination'),
  ),
  [AtomType.MuiTableRow]: dynamic(() => import('@mui/material/TableRow')),
  [AtomType.MuiTableSortLabel]: dynamic(
    () => import('@mui/material/TableSortLabel'),
  ),
  [AtomType.MuiTabs]: dynamic(() => import('@mui/material/Tabs')),
  [AtomType.MuiTextField]: dynamic(() => import('@mui/material/TextField')),
  [AtomType.MuiTextareaAutosize]: dynamic(
    () => import('@mui/material/TextareaAutosize'),
  ),
  [AtomType.MuiTimePicker]: dynamic(() => import('@mui/lab/TimePicker')),
  [AtomType.MuiTimeline]: dynamic(() => import('@mui/lab/Timeline')),
  [AtomType.MuiTimelineConnector]: dynamic(
    () => import('@mui/lab/TimelineConnector'),
  ),
  [AtomType.MuiTimelineContent]: dynamic(
    () => import('@mui/lab/TimelineContent'),
  ),
  [AtomType.MuiTimelineDot]: dynamic(() => import('@mui/lab/TimelineDot')),
  [AtomType.MuiTimelineItem]: dynamic(() => import('@mui/lab/TimelineItem')),
  [AtomType.MuiTimelineOppositeContent]: dynamic(
    () => import('@mui/lab/TimelineOppositeContent'),
  ),
  [AtomType.MuiTimelineSeparator]: dynamic(
    () => import('@mui/lab/TimelineSeparator'),
  ),
  [AtomType.MuiToggleButton]: dynamic(
    () => import('@mui/material/ToggleButton'),
  ),
  [AtomType.MuiToggleButtonGroup]: dynamic(
    () => import('@mui/material/ToggleButtonGroup'),
  ),
  [AtomType.MuiToolbar]: dynamic(() => import('@mui/material/Toolbar')),
  [AtomType.MuiTooltip]: dynamic(() => import('@mui/material/Tooltip')),
  [AtomType.MuiTreeItem]: dynamic(() => import('@mui/lab/TreeItem')),
  [AtomType.MuiTreeView]: dynamic(() => import('@mui/lab/TreeView')),
  [AtomType.MuiTypography]: dynamic(() => import('@mui/material/Typography')),
  [AtomType.MuiUnstableTrapFocus]: dynamic(
    () => import('@mui/core/Unstable_TrapFocus'),
  ),
  [AtomType.MuiYearPicker]: dynamic(() => import('@mui/lab/YearPicker')),
  [AtomType.MuiZoom]: dynamic(() => import('@mui/material/Zoom')),
}
