import React, { Component, Fragment } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import { ApplicationConsumer } from '../../contexts/application.jsx';

// TODO: Tidy up and implement context to dispatch errors when failed to retrieve
class Workstack extends Component {

    constructor(props) {
        super(props);
        this.state = { ...props };
    }

    componentDidMount() {
        axios.get('/api/page/workstack')
            .then(res => {
                this.setState({ cases: res.data.activeStages });
            })
            .catch(err => {
                /* eslint-disable-next-line */
                console.error(`UNABLE TO RETRIEVE WORKSTACK: ${err.stack}`);
            });
    }

    render() {
        const cases = this.state.cases;
        return (
            <Fragment>
                <table className='govuk-table'>
                    <caption className='govuk-table__caption'>Workstack</caption>
                    <thead className='govuk-table__head'>
                        <tr className='govuk-radios govuk-table__row'>
                            <th className='govuk-table__header'>Type</th>
                            <th className='govuk-table__header'>Reference</th>
                            <th className='govuk-table__header'>Stage</th>
                            <th className='govuk-table__header'>User</th>
                            <th className='govuk-table__header'>Team</th>
                            <th className='govuk-table__header'>Deadline</th>
                            <th className='govuk-table__header'>Actions</th>
                        </tr>
                    </thead>
                    <tbody className='govuk-table__body'>
                        {
                            cases && cases.sort((first, second) => first.caseReference.split('/')[1] > second.caseReference.split('/')[1] ? -1 : 1).map((c, i) => {
                                return (
                                    <tr key={i} className='govuk-radios govuk-table__row'>
                                        <td className='govuk-table__cell'>
                                            <strong className='govuk-tag'>{c.caseType}</strong>
                                        </td>
                                        <td className='govuk-table__cell'>{c.caseReference}</td>
                                        <td className='govuk-table__cell'>{c.stageTypeDisplay}</td>
                                        {/* We don't need this on the User stack, only the Team stack */}
                                        <td className='govuk-table__cell'>{c.assignedUserDisplay}</td>
                                        <td className='govuk-table__cell'>{c.assignedTeamDisplay}</td>
                                        <td className='govuk-table__cell'>{c.deadline}</td>
                                        <td className='govuk-table__cell'>
                                            {
                                                c.assignedUserDisplay === 'Unassigned' ?
                                                    <Link to={`/case/${c.caseUUID}/stage/${c.stageUUID}/allocate`} className="govuk-link govuk-!-margin-right-3">Allocate</Link> :
                                                    <Link to={`/case/${c.caseUUID}/stage/${c.stageUUID}`} className="govuk-link govuk-!-margin-right-3">Casework</Link>
                                            }
                                            <Link to={`/case/${c.caseUUID}/summary`} className="govuk-link">Summary</Link>
                                        </td>
                                    </tr>
                                );
                            })
                        }
                    </tbody>
                </table>
            </Fragment>
        );
    }
}

const WrappedWorkstack = props => (
    <ApplicationConsumer>
        {({ workstack }) => <Workstack {...props} cases={workstack} />}
    </ApplicationConsumer>
);

export default WrappedWorkstack;