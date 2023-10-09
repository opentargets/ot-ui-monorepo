import {
  Typography,
  styled,
  Stack,
  Card,
  CardActionArea,
  CardContent,
} from '@mui/material';
import { Route } from 'react-router-dom';
import { BasePage, Link } from 'ui';
import { v1 } from 'uuid';
import { faPlus } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import TheoremInstance from './TheoremInstance';
import useLocalStorage from './useLocalStorage';
import { ENTITIES } from './utils';

const TheoremsList = styled(Stack)``;

const AddIconContainer = styled('div')`
  width: 100%;
  min-height: 80px;
  display: flex;
  align-items: center;
  justify-content: center;
`;

function AddTheorem({ onClick }) {
  return (
    <Card
      sx={{ maxWidth: 345, backgroundColor: '#f4f4f4' }}
      onClick={() => onClick()}
    >
      <CardActionArea>
        <CardContent>
          <Typography gutterBottom variant="h6" component="div">
            Add theorem
          </Typography>
          <AddIconContainer>
            <FontAwesomeIcon icon={faPlus} />
          </AddIconContainer>
        </CardContent>
      </CardActionArea>
    </Card>
  );
}

function TheoremHome() {
  const [theoremState, setTheoremState] = useLocalStorage('theorems');

  const handleAddTheoremClick = () => {
    setTheoremState([[], ...theoremState]);
  };

  return (
    <BasePage>
      <Typography variant="h4" paragraph>
        Theorem
      </Typography>
      <Typography paragraph>
        Theorem is a graphical interface that lets users to build their own
        research experience using the Open Targets entities.
      </Typography>

      <TheoremsList direction="row" spacing={2}>
        {theoremState.map(theorem => (
          <Link
            key={v1()}
            to={`/theorem/research?blocks=${JSON.stringify(theorem)}`}
          >
            <Card sx={{ maxWidth: 345 }}>
              <CardActionArea>
                <CardContent>
                  <Typography gutterBottom variant="h6" component="div">
                    Hypothesis
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    Evidence{' '}
                    <b>
                      {
                        theorem.filter(el => el.entity === ENTITIES.EVIDENCE)
                          .length
                      }
                    </b>
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    Target{' '}
                    <b>
                      {
                        theorem.filter(el => el.entity === ENTITIES.TARGET)
                          .length
                      }
                    </b>
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    Disease{' '}
                    <b>
                      {
                        theorem.filter(el => el.entity === ENTITIES.DISEASE)
                          .length
                      }
                    </b>
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    Drug{' '}
                    <b>
                      {theorem.filter(el => el.entity === ENTITIES.DRUG).length}
                    </b>
                  </Typography>
                </CardContent>
              </CardActionArea>
            </Card>
          </Link>
        ))}
        <AddTheorem onClick={handleAddTheoremClick} />
      </TheoremsList>
    </BasePage>
  );
}

function TheoremPage() {
  return (
    <div>
      <Route exact path="/theorem">
        <TheoremHome />
      </Route>
      <Route path="/theorem/research">
        <TheoremInstance />
      </Route>
    </div>
  );
}

export default TheoremPage;
