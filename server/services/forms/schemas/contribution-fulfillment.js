const Form = require('../form-builder');
const { Component, Choice, ConditionChoice } = require('../component-builder');
const { getSomuItem } = require('../../../middleware/somu');

module.exports = async options => {
    const { data } = await getSomuItem(options);

    return Form()
        .withTitle('Contribution Request Fulfillment')
        .withField(
            Component('dropdown', 'contributionBusinessArea')
                .withValidator('required')
                .withProp('label', 'Business Area')
                .withProp('choices', [
                    Choice('UKVI', 'UKVI'),
                    Choice('BF', 'BF'),
                    Choice('IE', 'IE'),
                    Choice('EUSS', 'EUSS'),
                    Choice('HMPO', 'HMPO'),
                    Choice('Windrush', 'Windrush'),
                    Choice('Coronavirus (COVID-19)', 'Coronavirus')
                ])
                .build()
        )
        .withField(
            Component('dropdown', 'contributionBusinessUnit')
                .withValidator('required')
                .withProp('label', 'Business Unit')
                .withProp('conditionChoices', [
                    ConditionChoice('contributionBusinessArea', 'UKVI', 'S_MPAM_BUS_UNITS_1'),
                    ConditionChoice('contributionBusinessArea', 'BF', 'S_MPAM_BUS_UNITS_2'),
                    ConditionChoice('contributionBusinessArea', 'IE', 'S_MPAM_BUS_UNITS_3'),
                    ConditionChoice('contributionBusinessArea', 'EUSS', 'S_MPAM_BUS_UNITS_4'),
                    ConditionChoice('contributionBusinessArea', 'HMPO', 'S_MPAM_BUS_UNITS_5'),
                    ConditionChoice('contributionBusinessArea', 'Windrush', 'S_MPAM_BUS_UNITS_6'),
                    ConditionChoice('contributionBusinessArea', 'Coronavirus', 'S_MPAM_BUS_UNITS_7')
                ])
                .build()
        )
        .withField(
            Component('date', 'contributionRequestDate')
                .withValidator('required')
                .withValidator('isValidDate')
                .withValidator('isBeforeToday')
                .withProp('label', 'Contribution request date')
                .build()
        )
        .withField(
            Component('date', 'contributionDueDate')
                .withValidator('required')
                .withValidator('isValidDate')
                .withValidator('isValidWithinDate')
                .withProp('label', 'Contribution due date')
                .build()
        )
        .withField(
            Component('text-area', 'contributionRequestNote')
                .withValidator('required')
                .withProp('label', 'What you are requesting')
                .build()
        )
        .withField(
            Component('radio', 'contributionStatus')
                .withProp('label', 'Contribution Status')
                .withProp('choices', [
                    Choice('Complete', 'contributionReceived'),
                    Choice('Cancelled', 'contributionCancelled')
                ])
                .build()
        )
        .withField(
            Component('date', 'contributionReceivedDate')
                .withValidator('required')
                .withValidator('isValidDate',)
                .withValidator('isBeforeToday')
                .withValidator('isValidWithinDate')
                .withProp('label', 'Contribution received date')
                .withProp('visibilityConditions', [
                    {
                        'conditionPropertyName': 'contributionStatus',
                        'conditionPropertyValue': 'contributionReceived'
                    }
                ])
                .build()
        )
        .withField(
            Component('text-area', 'contributionReceivedNote')
                .withValidator('required', 'Contribution completion notes is required')
                .withProp('label', 'Details')
                .withProp('visibilityConditions', [
                    {
                        'conditionPropertyName': 'contributionStatus',
                        'conditionPropertyValue': 'contributionReceived'
                    }
                ])
                .build()
        )
        .withField(
            Component('text-area', 'contributionCancellationNote')
                .withValidator('required', 'Contribution cancellation reason is required')
                .withProp('label', 'Reason for cancelling')
                .withProp('visibilityConditions', [
                    {
                        'conditionPropertyName': 'contributionStatus',
                        'conditionPropertyValue': 'contributionCancelled'
                    }
                ])
                .build()
        )
        .withSecondaryAction(
            Component('backlink')
                .withProp('label', 'Back')
                .withProp('action', `/case/${options.caseId}/stage/${options.stageId}`)
                .build()
        )
        .withPrimaryActionLabel('Update')
        .withData(data)
        .build();
};
