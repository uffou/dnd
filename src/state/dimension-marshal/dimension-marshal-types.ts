import type { Position } from 'css-box-model';
import type {
  CollectionStartingActionCreator,
  PublishWhileDraggingActionCreator,
  UpdateDroppableScrollActionCreator,
  UpdateDroppableIsEnabledActionCreator,
  UpdateDroppableIsCombineEnabledActionCreator,
  UpdateDroppableLocationActionCreator,
  UpdateDroppableIsCombineOnlyCreator,
} from '../action-creators';
import type {
  DroppableId,
  Critical,
  DimensionMap,
  LiftRequest,
  Viewport,
  DroppableDimension,
} from '../../types';

export interface StartPublishingResult {
  critical: Critical;
  dimensions: DimensionMap;
  viewport: Viewport;
}

export interface DimensionMarshal {
  // it is possible for a droppable to change whether it is enabled during a drag
  updateDroppableIsEnabled: (id: DroppableId, isEnabled: boolean) => void;
  // it is also possible to update whether combining is enabled
  updateDroppableIsCombineEnabled: (
    id: DroppableId,
    isEnabled: boolean,
  ) => void;
  updateDroppableIsCombineOnly: (id: DroppableId, isEnabled: boolean) => void;
  updateDroppableScroll: (id: DroppableId, newScroll: Position) => void;
  updateDroppableLocation: (
    id: DroppableId,
    droppableData: DroppableDimension,
  ) => void;
  scrollDroppable: (id: DroppableId, change: Position) => void;
  // Entry
  startPublishing: (request: LiftRequest) => StartPublishingResult;
  stopPublishing: () => void;
}

export interface Callbacks {
  collectionStarting: CollectionStartingActionCreator;
  publishWhileDragging: PublishWhileDraggingActionCreator;
  updateDroppableScroll: UpdateDroppableScrollActionCreator;
  updateDroppableLocation: UpdateDroppableLocationActionCreator;
  updateDroppableIsEnabled: UpdateDroppableIsEnabledActionCreator;
  updateDroppableIsCombineEnabled: UpdateDroppableIsCombineEnabledActionCreator;
  updateDroppableIsCombineOnly: UpdateDroppableIsCombineOnlyCreator;
}
