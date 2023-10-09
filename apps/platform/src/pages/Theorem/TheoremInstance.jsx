/* eslint-disable prefer-destructuring */
import { v1 } from 'uuid';
import { Suspense } from 'react';
import { useQuery } from '@apollo/client';
import { BasePage, Link, useStateParams } from 'ui';

import { BlockWrapper, ControlsWrapper } from './components';
import BlockHeader from './BlockHeader';
import EditDrawer from './EditDrawer';

import targetSections from '../../sections/targetSections';
import evidenceSections from '../../sections/evidenceSections';
import drugSections from '../../sections/drugSections';
import diseaseSections from '../../sections/diseaseSections';

import { ENTITIES, INIT_BLOCKS_STATE, getBlockProfileQuery } from './utils';

function SectionRender({ entity, section, inputs = [] }) {
  let Component = null;
  let id = null;
  let label = null;
  let entityForSection = null;
  switch (entity) {
    case ENTITIES.TARGET:
      Component = targetSections.get(section);
      id = inputs[0];
      entityForSection = entity;
      break;
    case ENTITIES.DISEASE:
      Component = diseaseSections.get(section);
      id = inputs[0];
      entityForSection = entity;
      break;
    case ENTITIES.DRUG:
      Component = drugSections.get(section);
      id = inputs[0];
      entityForSection = entity;
      break;
    case ENTITIES.EVIDENCE:
      Component = evidenceSections.get(section);
      id = { ensgId: inputs[0], efoId: inputs[1] };
      label = { symbol: '', name: '' };
      entityForSection = ENTITIES.DISEASE;
      break;
    default:
      return 'No Section parser';
  }
  return (
    <Component key={v1()} id={id} label={label} entity={entityForSection} />
  );
}

function BlockRender({ entity, inputs, children }) {
  const { query, variables } = getBlockProfileQuery({ entity, inputs });
  const { data, loading, error } = useQuery(query, {
    variables,
  });

  if (loading) return <BlockWrapper>Loading block ...</BlockWrapper>;
  if (!data && !loading) return null;
  if (error) return null;

  return (
    <BlockWrapper>
      <BlockHeader entity={entity} data={data} />
      {children}
    </BlockWrapper>
  );
}

function TheoremInstance() {
  const [blocks, setBlocks] = useStateParams(
    INIT_BLOCKS_STATE,
    'blocks',
    obj => JSON.stringify(obj),
    str => JSON.parse(str)
  );

  // console.log(JSON.stringify(blocks));

  return (
    <BasePage>
      <ControlsWrapper>
        <Link to="/theorem">Back</Link>
        <EditDrawer blocks={blocks} setBlocks={setBlocks} />
      </ControlsWrapper>
      {blocks.map(({ entity, sections, inputs }) => (
        <BlockRender key={v1()} entity={entity} inputs={inputs}>
          {sections.map(section => (
            <Suspense key={v1()} fallback="Loading">
              <SectionRender
                entity={entity}
                section={section}
                inputs={inputs}
              />
            </Suspense>
          ))}
        </BlockRender>
      ))}
    </BasePage>
  );
}

export default TheoremInstance;
