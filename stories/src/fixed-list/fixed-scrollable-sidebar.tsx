import React, { ReactElement } from 'react';
import ReactDOM from 'react-dom';
import styled from '@emotion/styled';
import { colors } from '@atlaskit/theme';
import { DragDropContext, Draggable, Droppable } from '@hello-pangea/dnd';
import type {
  DropResult,
  DraggableProvided,
  DraggableStateSnapshot,
  DroppableProvided,
} from '@hello-pangea/dnd';
import type { Quote } from '../types';
import { grid } from '../constants';
import { getQuotes } from '../data';
import QuoteItem from '../primatives/quote-item';
import { invariant } from '../../../src/invariant';

const sidebarWidth = 300;

const Title = styled.h2`
  text-align: center;
  padding-top: ${grid * 3}px;
  margin-bottom: ${grid * 3}px;
`;

const SidebarContainer = styled.div`
  width: ${sidebarWidth}px;
  height: 100vh;
  overflow: auto;
  background-color: ${colors.B50};
  position: fixed;
`;

interface ListProps {
  quotes: Quote[];
}

const sidebarPortal: HTMLElement = document.createElement('div');
sidebarPortal.classList.add('sidebar-portal');

invariant(document.body, 'body not ready for portal creation!');

document.body.appendChild(sidebarPortal);

class Sidebar extends React.Component<ListProps> {
  render() {
    return (
      <SidebarContainer>
        <Title>Fixed sidebar Experiment</Title>
        <Droppable droppableId="sidebar">
          {(droppableProvided: DroppableProvided) => (
            <div
              {...droppableProvided.droppableProps}
              ref={droppableProvided.innerRef}
            >
              {this.props.quotes.map((quote: Quote, index: number) => (
                <Draggable draggableId={quote.id} index={index} key={quote.id}>
                  {(
                    draggableProvided: DraggableProvided,
                    draggableSnapshot: DraggableStateSnapshot,
                  ): ReactElement => {
                    const usePortal: boolean = draggableSnapshot.isDragging;

                    const child: ReactElement = (
                      <QuoteItem
                        quote={quote}
                        isDragging={draggableSnapshot.isDragging}
                        provided={draggableProvided}
                      />
                    );

                    if (!usePortal) {
                      return child;
                    }

                    return ReactDOM.createPortal(child, sidebarPortal);
                  }}
                </Draggable>
              ))}
              {droppableProvided.placeholder}
            </div>
          )}
        </Droppable>
      </SidebarContainer>
    );
  }
}

const ContentContainer = styled.div`
  margin-left: ${sidebarWidth}px;
  display: flex;
`;

const ContentList = styled.div`
  width: ${sidebarWidth}px;
  margin: 0 auto;
`;

const BoardList = styled.div`
  width: ${sidebarWidth}px;
  height: 70vh;
  overflow-y: auto;
  margin: 0 auto;
`;

class MoreContent extends React.Component<ListProps> {
  render() {
    return (
      <Droppable droppableId="vlist">
        {(droppableProvided: DroppableProvided) => (
          <BoardList
            {...droppableProvided.droppableProps}
            ref={droppableProvided.innerRef}
          >
            {this.props.quotes.map((quote: Quote, index: number) => (
              <Draggable
                draggableId={`amazing-${quote.id}`}
                index={index}
                key={quote.id}
              >
                {(
                  draggableProvided: DraggableProvided,
                  draggableSnapshot: DraggableStateSnapshot,
                ) => (
                  <QuoteItem
                    quote={quote}
                    isDragging={draggableSnapshot.isDragging}
                    provided={draggableProvided}
                  />
                )}
              </Draggable>
            ))}
            {droppableProvided.placeholder}
          </BoardList>
        )}
      </Droppable>
    );
  }
}
class Content extends React.Component<ListProps> {
  render() {
    return (
      <ContentContainer>
        <Title>Scrollable body</Title>
        <p>Current limitation: they cannot be connected</p>
        <Droppable droppableId="content">
          {(droppableProvided: DroppableProvided) => (
            <ContentList
              {...droppableProvided.droppableProps}
              ref={droppableProvided.innerRef}
            >
              {this.props.quotes.map((quote: Quote, index: number) => (
                <Draggable draggableId={quote.id} index={index} key={quote.id}>
                  {(
                    draggableProvided: DraggableProvided,
                    draggableSnapshot: DraggableStateSnapshot,
                  ) => (
                    <QuoteItem
                      quote={quote}
                      isDragging={draggableSnapshot.isDragging}
                      provided={draggableProvided}
                    />
                  )}
                </Draggable>
              ))}
              {droppableProvided.placeholder}
            </ContentList>
          )}
        </Droppable>
        <MoreContent quotes={this.props.quotes} />
      </ContentContainer>
    );
  }
}

interface State {
  inSidebar: Quote[];
  inContent: Quote[];
}

const initial: State = {
  inSidebar: getQuotes(40),
  inContent: getQuotes(100),
};

export default class App extends React.Component<unknown, State> {
  state: State = initial;

  onDragEnd = (result: DropResult): void => {
    // eslint-disable-next-line no-console
    console.log('TODO: reorder', result);
  };

  render(): ReactElement {
    return (
      <DragDropContext onDragEnd={this.onDragEnd}>
        <React.Fragment>
          <Sidebar quotes={this.state.inSidebar} />
          <Content quotes={this.state.inContent} />
        </React.Fragment>
      </DragDropContext>
    );
  }
}
