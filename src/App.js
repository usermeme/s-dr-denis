import { useState } from "react";
import { Container, Grid, TextField, Typography, Button } from "@mui/material";
import "./App.css";

import CryptoJS from "crypto-js";

// код плохой, так что не смотреть:D
function hashCode(string) {
  var hash = 0;
  for (var i = 0; i < string.length; i++) {
    var code = string.charCodeAt(i);
    hash = (hash << 5) - hash + code;
    hash = hash & hash; // Convert to 32bit integer
  }
  return hash;
}

const Layout = ({
  label,
  value,
  onChange,
  onNextStep,
  disabledNextStep,
  children,
  answer,
}) => {
  return (
    <Grid container gap={8} maxWidth={300}>
      <Grid item xs="12">
        <Typography align="justify">{label}</Typography>
      </Grid>
      {onChange && (
        <Grid item xs="12">
          <TextField value={value} onChange={onChange} fullWidth />
        </Grid>
      )}
      {onNextStep && (
        <Grid item xs="12" justifyContent={"center"} alignItems={"center"}>
          <Button
            disabled={disabledNextStep}
            onClick={onNextStep}
            variant="contained"
          >
            Следующий шаг
          </Button>
        </Grid>
      )}

      {answer && (
        <Grid container item xs="12">
          <Grid item xs="3">
            <Typography>Ответ</Typography>
          </Grid>
          <Grid item xs="auto">
            {children}
          </Grid>
        </Grid>
      )}
    </Grid>
  );
};

const FirstStep = ({ setNextStep }) => {
  const label =
    "Деняяя! С днем рождения тебя. Чтоб получить свой подарок тебе надо пройти квест. Не все так просто, да. Правила очень просты, я хочу чтобы мадара стал хоккаге. Я думаю ты шаришь за этот мем. Но на самом деле: тебе нужно просто найти ответ. Возможно подскажет тебе код, а может и Яна. Кнопка будет задизейбленна до правильного ответа. Начнем?";

  return <Layout label={label} onNextStep={setNextStep} />;
};

const SECOND_STEP_ANSWER = 33333526;
const SecondStep = ({ setNextStep }) => {
  const label =
    "Итак, первый вопрос: когда мы познакомились? Формат ответа: время года";
  const [value, setValue] = useState("");

  const answer = hashCode(value.toLowerCase().trim());
  const disabledNext = answer !== SECOND_STEP_ANSWER;

  console.log(answer);
  return (
    <Layout
      label={label}
      onChange={(e) => setValue(e.target.value)}
      onNextStep={setNextStep}
      disabledNextStep={disabledNext}
    />
  );
};

const THIRD_STEP_ANSWER = -1734247825;
const ThirdStep = ({ setNextStep }) => {
  const label =
    "Блюдо, ради которого мы готовы приехать в Беларусь на званный ужин";
  const [value, setValue] = useState("");
  const answer = hashCode(value.toLowerCase().trim());
  const disabledNext = answer !== THIRD_STEP_ANSWER;

  return (
    <Layout
      label={label}
      onChange={(e) => setValue(e.target.value)}
      onNextStep={setNextStep}
      disabledNextStep={disabledNext}
    />
  );
};

const FOURTH_STEP_ANSWER = 1511459;
const FourthStep = ({ setNextStep }) => {
  const label = "Номер самой бандитской машина";
  const [value, setValue] = useState("");
  const answer = hashCode(value.toLowerCase().trim());
  const disabledNext = answer !== FOURTH_STEP_ANSWER;

  return (
    <Layout
      label={label}
      onChange={(e) => setValue(e.target.value)}
      onNextStep={setNextStep}
      disabledNextStep={disabledNext}
    />
  );
};

const FIFTH_STEP_ANSWER = 1667966568;
const FifthStep = ({ setNextStep }) => {
  const label = "Какая у тебя на самом деле фамилия";
  const [value, setValue] = useState("");
  const answer = hashCode(value.toLowerCase().trim());
  console.log(answer);
  const disabledNext = answer !== FIFTH_STEP_ANSWER;

  return (
    <Layout
      label={label}
      onChange={(e) => setValue(e.target.value)}
      onNextStep={setNextStep}
      disabledNextStep={disabledNext}
    />
  );
};

const LAST_STEP_ANSWER_1 =
  "U2FsdGVkX1/rlGj+A183KjmFwhsxWWzYuzvz2QIl8cejfYaTsBvzyA5LxQnJ83u7YFYpOSuNJmDXu8Br8s1ZXg== ";

const LAST_STEP_ANSWER_2 =
  "U2FsdGVkX1+iG2JqriQs1ATq3Xf+pG5E3qsn8avU43KrHEscgN5Q/xlDVhXgc+cU88S0SM5UKJT0Cjg5KQukNQ==";

const getValue = (value, secret) => {
  try {
    const bytes1 = CryptoJS.AES.decrypt(value, secret);
    const originalText1 = bytes1.toString(CryptoJS.enc.Utf8);

    return originalText1;
  } catch (error) {
    return "";
  }
};
const LastStep = ({ setNextStep }) => {
  const label =
    "Итак, почти все, остался последний вопрос. Кто главные наебщик в нашей компании:D От кого это все пошло? Были же нормальные";
  const [value, setValue] = useState("");

  const hashedValue = String(hashCode(value.toLowerCase().trim()));

  const originalText1 = getValue(LAST_STEP_ANSWER_1, hashedValue);
  const originalText2 = getValue(LAST_STEP_ANSWER_2, hashedValue);

  return (
    <Layout
      label={label}
      onChange={(e) => setValue(e.target.value)}
      answer={true}
      children={
        <Grid container>
          <Grid item xs={12}>
            {originalText1 ? (
              <Typography>Забирай свой подарок по ссылке</Typography>
            ) : (
              <Typography>тут должны быть ссылки</Typography>
            )}
          </Grid>
          <Grid item xs={12}>
            <Typography
              component={originalText1 ? "a" : "span"}
              href={originalText1}
              target="_blank"
            >
              {originalText1}
            </Typography>
          </Grid>
          <Grid item xs={12}>
            <Typography
              component={originalText2 ? "a" : "span"}
              href={originalText2}
              target="_blank"
            >
              {originalText2}
            </Typography>
          </Grid>
          {originalText2 && (
            <Grid item xs={12}>
              <video width="320" height="240" autoPlay>
                <source
                  src={process.env.PUBLIC_URL + "1.mp4"}
                  type="video/mp4"
                />
              </video>
            </Grid>
          )}
        </Grid>
      }
    />
  );
};

function App() {
  const [step, setStep] = useState(0);

  const setNextStep = () => setStep((prev) => prev + 1);

  const renderStep = (props) => {
    switch (step) {
      case 0:
        return <FirstStep {...props} />;
      case 1:
        return <SecondStep {...props} />;
      case 2:
        return <ThirdStep {...props} />;
      case 3:
        return <FourthStep {...props} />;
      case 4:
        return <FifthStep {...props} />;

      default:
        return <LastStep />;
    }
  };
  return (
    <Container>
      <div className="app_wrapper">{renderStep({ setNextStep })}</div>
    </Container>
  );
}

export default App;
