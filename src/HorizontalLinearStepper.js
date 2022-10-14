import * as React from 'react';
import Box from '@mui/material/Box';
import Stepper from '@mui/material/Stepper';
import Step from '@mui/material/Step';
import StepLabel from '@mui/material/StepLabel';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import {useTranslation} from "react-i18next";



export default function HorizontalLinearStepper(props) {
    //const [activeStep, setActiveStep] = React.useState(0);
    const [skipped, setSkipped] = React.useState(new Set());
    const {t} = useTranslation();

    const steps = [t('Investor profile'), t('Assets and debts'), t('Analysis'), t('Save')];

    const isStepOptional = (step: number) => {
        //No optional steps for now
        //return step === 1;
    };

    const isStepSkipped = (step: number) => {
        return skipped.has(step);
    };

    const handleNext = () => {
        let newSkipped = skipped;
        if (isStepSkipped(props.activeStep)) {
            newSkipped = new Set(newSkipped.values());
            newSkipped.delete(props.activeStep);
        }

        props.setActiveStep((prevActiveStep) => prevActiveStep + 1);
        setSkipped(newSkipped);
    };

    const handleBack = () => {
        props.setActiveStep((prevActiveStep) => prevActiveStep - 1);
    };

    const handleSkip = () => {
        if (!isStepOptional(props.activeStep)) {
            // You probably want to guard against something like this,
            // it should never occur unless someone's actively trying to break something.
            throw new Error("You can't skip a step that isn't optional.");
        }

        props.setActiveStep((prevActiveStep) => prevActiveStep + 1);
        setSkipped((prevSkipped) => {
            const newSkipped = new Set(prevSkipped.values());
            newSkipped.add(props.activeStep);
            return newSkipped;
        });
    };

    const handleReset = () => {
        //ToDo
        props.setActiveStep(0);
    };

    return (
        <Box sx={{ width: '100%' }}>
            <Stepper activeStep={props.activeStep}>
                {steps.map((label, index) => {
                    const stepProps: { completed?: boolean } = {};
                    const labelProps: {
                        optional?: React.ReactNode;
                    } = {};
                    if (isStepOptional(index)) {
                        labelProps.optional = (
                            <Typography variant="caption">Optional</Typography>
                        );
                    }
                    if (isStepSkipped(index)) {
                        stepProps.completed = false;
                    }
                    return (
                        <Step key={label} {...stepProps}>
                            <StepLabel {...labelProps}>{label}</StepLabel>
                        </Step>
                    );
                })}
            </Stepper>
            {props.activeStep === steps.length ? (
                <React.Fragment>
                    <Typography sx={{ mt: 2, mb: 1 }}>
                        All steps completed - you&apos;re finished
                    </Typography>
                    <Box sx={{ display: 'flex', flexDirection: 'row', pt: 2 }}>
                        <Box sx={{ flex: '1 1 auto' }} />
                        <Button onClick={handleReset}>{t('Reset')}</Button>
                    </Box>
                </React.Fragment>
            ) : (
                <React.Fragment>
                    {/*<Typography sx={{ mt: 2, mb: 1 }}>Step {props.activeStep + 1}</Typography>*/}
                    <Box sx={{ display: 'flex', flexDirection: 'row', pt: 2 }}>
                        <Button
                            color="inherit"
                            disabled={props.activeStep === 0}
                            onClick={handleBack}
                            sx={{ mr: 1 }}
                        >
                            {t('Back')}
                        </Button>
                        <Box sx={{ flex: '1 1 auto' }} />
                        {isStepOptional(props.activeStep) && (
                            <Button color="inherit" onClick={handleSkip} sx={{ mr: 1 }}>
                                Skip
                            </Button>
                        )}
                        <Button onClick={handleNext} disabled={props.activeStep === steps.length - 1}> {/*Modified here to disable finish...*/}
                            {/*{props.activeStep === steps.length - 1 ? t('Finish') : t('Next')}*/} {/*..and here*/}
                            {t('Next')}
                        </Button>
                    </Box>
                </React.Fragment>
            )}
        </Box>
    );
}