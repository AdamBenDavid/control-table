import {createColumnHelper} from '@tanstack/react-table';
import {type DeploymentPoint} from '../types';
import {DeploymentDirections} from '../directions';
import Button from '@material-ui/core/Button';
import Tooltip from '@material-ui/core/Tooltip';
import deleteIcon from '../icons/trash.svg';
import arrowButton from '../icons/Arrow.svg';
import styles from './deployment-points-table.module.scss';
import {TABLE_ACTIONS_COLUMN_ID} from "./table.const.ts";

const columnHelper = createColumnHelper<DeploymentPoint>();

export const deploymentPointsTableColumns = [
  columnHelper.accessor('name', {
    header: 'שם נק׳ פריסה',
    cell: (info) => {
      const {isEditing, onEdit} = info.table.options.meta;
      return (
          <div className={isEditing ? styles.underlineOnHover : ''}
               onClick={() => isEditing && onEdit!(info.row.original)}>
            {info.getValue()}
          </div>
      );
    },
  }),
  columnHelper.accessor((dp) => `${dp.coordinates.lat}/${dp.coordinates.lng}`, {
    id: 'coordinates',
    header: 'נ.צ',
    meta: {},
    cell: (info) => {
      const {isEditing, onEdit} = info.table.options.meta;
      return (
          <div className={isEditing ? styles.clickableCell : ''} onClick={() => isEditing && onEdit(info.row.original)}>
            {info.getValue()}
          </div>
      );
    },
  }),
  columnHelper.accessor('division', {
    header: 'חטיבה',
    cell: (info) => {
      const {isEditing, onEdit} = info.table.options.meta;

      return (
          <div className={isEditing ? styles.clickableCell : ''}
               onClick={() => isEditing && onEdit!(info.row.original)}>
            {info.getValue()}
          </div>
      );
    },
  }),
  columnHelper.display({
    id: 'directions',
    header: 'כיוונים ממופים',
    cell: (info) => (
        <div className={styles.directionColumn}>
          <div className={styles.directionDetails}>
            <span className={styles.directionCount}>{info.row.original.directions.length}</span>
            <span className={styles.directionText}>
            {info.row.original.directions.map((d) => DeploymentDirections[d]).join('/')}
          </span>
          </div>
          <Button>
            <img src={arrowButton} alt='dir' className={styles.arrowIcon}/>
          </Button>
        </div>
    ),
  }),
  columnHelper.display({
    id: 'linkedUsers',
    header: 'יוזרים מקושרים',
    cell: (info) => (
        <div className={styles.directionColumn}>
          <span className={styles.users}>{info.row.original.linkedUsersCount}</span>
          <Button>
            <img src={arrowButton} alt='users' className={styles.arrowIcon}/>
          </Button>
        </div>
    ),
  }),
  columnHelper.display({
    id: TABLE_ACTIONS_COLUMN_ID,
    header: '',
    cell: (info) => {
      const {onDelete} = info.table.options.meta;

      return (
          <div className={styles.deleteTooltip}>
            <Tooltip title='מחק'>
              <img src={deleteIcon} alt='delete' className={styles.icon} onClick={() => onDelete(info.row.original)}/>
            </Tooltip>
          </div>
      );
    },
  }),
];
