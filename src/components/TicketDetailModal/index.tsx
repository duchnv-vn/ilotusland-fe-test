'use client';
import React from 'react';
import Link from 'next/link';
import { observer } from 'mobx-react-lite';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faChevronRight,
  faClock,
  faEye,
  faXmark,
} from '@fortawesome/free-solid-svg-icons';
import { Box, Tabs } from '@radix-ui/themes';
import { useStores } from '@/store/storeProvider';
import UserAvatar from '../UserAvatar';
import { calculateTimeDistance, checkIsInYesterdayOrToday } from '@/utils/date';
import { TicketAttachedFile, TicketDetail } from '@/common/type/ticket.type';
import { FileTypeIcons, TicketPriorityIcon } from '@/common/constant';
import { AttachedFileType, TicketPriority } from '@/common/enum/ticket';
import { User } from '@/common/type/user.type';
import Button from '../ui/button';
import { Company } from '@/common/type/company.type';

import './index.scss';

const ContentHeader = ({
  taskId,
  taskTitle,
  stageId,
}: {
  taskId: number;
  taskTitle: string;
  stageId: number;
}) => {
  const {
    ProjectStore: { findStage },
  } = useStores();

  const stage = findStage(stageId);
  return (
    <div className="content-header">
      <div className="left-section">
        <p className="task-title">{`[${taskId}] ${taskTitle}`}</p>
      </div>
      <div className="right-section">
        <div className={`stage project-stage-${stageId}`}>{stage.name}</div>
        <div className="view-process-button">
          <FontAwesomeIcon {...{ icon: faEye, className: 'icon' }} />
          <span className="text">View Process</span>
        </div>
      </div>
    </div>
  );
};

const CreateInfo = ({
  avatarUrl,
  name,
  email,
  updatedAt,
}: {
  avatarUrl: string;
  name: string;
  email: string;
  updatedAt: string;
}) => {
  const { isYesterday, isToday, date, time } =
    checkIsInYesterdayOrToday(updatedAt);
  let dateString = '';
  switch (true) {
    case isYesterday:
      dateString = `Yesterday ${time}`;
      break;

    case isToday:
      dateString = `Today ${time}`;
      break;

    default:
      dateString = `${date} ${time}`;
      break;
  }

  return (
    <div className="create-info">
      <div className="user-info">
        <UserAvatar {...{ src: avatarUrl, alt: name }} />
        <div className="inner-info">
          <span className="name">{name}</span>
          <span className="email">{email}</span>
        </div>
      </div>
      <div className="update-date">Raised this on {dateString}</div>
    </div>
  );
};

const Description = ({ description }: { description: string }) => {
  return (
    <div className="description">
      <p className="paragraph">{description}</p>
    </div>
  );
};

const File = ({
  file: { name, size, type, url },
}: {
  file: TicketAttachedFile;
}) => {
  const fileType =
    AttachedFileType[type as AttachedFileType] || AttachedFileType.unknown;

  return (
    <Link className="file" href={url} target="_blank">
      <FontAwesomeIcon
        {...{
          icon: FileTypeIcons[fileType],
          className: `icon file-icon-${fileType}`,
        }}
      />
      <div className="file-info">
        <p className="name">{name}</p>
        <span className="size">{size}</span>
      </div>
    </Link>
  );
};

const AttachedFiles = ({
  attachedFiles,
}: {
  attachedFiles: TicketAttachedFile[];
}) => {
  return (
    <div className="attached-files">
      <p className="title">{attachedFiles.length} ATTACHED FILES</p>
      <div className="file-list">
        {attachedFiles.map((file, index) => (
          <File {...{ file }} key={index} />
        ))}
      </div>
    </div>
  );
};

const TabItem = ({
  assignee: { avatarUrl, name },
}: {
  assignee: User;
  stageValue: string;
}) => {
  return (
    <div className="tab">
      <div className="assignee">
        <span className="label">Assignee</span>
        <div className="info">
          <UserAvatar {...{ src: avatarUrl, alt: name }} />
          <span className="name">{name}</span>
        </div>
      </div>
      <textarea className="comment-input" placeholder="Add your comment" />
    </div>
  );
};

const StageTabs = ({ assignee }: { assignee: User }) => {
  const tabs = [
    { label: 'Screening', value: 'screening' },
    { label: 'Planning', value: 'planning' },
    { label: 'Implementation', value: 'implementation' },
  ];
  return (
    <div className="stage-tabs">
      <Tabs.Root defaultValue={tabs[0].value}>
        <Tabs.List className="flex justify-between">
          {tabs.map(({ label, value }, index) => (
            <Tabs.Trigger value={value} key={index}>
              {label}
            </Tabs.Trigger>
          ))}
        </Tabs.List>

        <Box>
          {tabs.map(({ value }, index) => (
            <Tabs.Content value={value} key={index}>
              <TabItem {...{ assignee, stageValue: value }} />
            </Tabs.Content>
          ))}
        </Box>
      </Tabs.Root>
    </div>
  );
};

const ActionButtons = () => {
  return (
    <div className="action-button-wrapper">
      <Button
        {...{ label: 'Reject', className: 'reject-button', icon: faXmark }}
      />
      <Button
        {...{
          label: 'Approve & Assign',
          className: 'approve-button',
          icon: faChevronRight,
        }}
      />
    </div>
  );
};

const CompanyInfo = ({ company: { name, address } }: { company: Company }) => {
  return (
    <div className="company-info">
      <p className="name">{name}</p>
      <p className="address">{address}</p>
    </div>
  );
};

const TicketInfoTable = ({ ticketDetail }: { ticketDetail: TicketDetail }) => {
  const {
    customer: { name, phoneNumber },
    requestTypeId,
    timeTracking,
    priority,
  } = ticketDetail;

  const {
    ProjectStore: { findRequestType },
  } = useStores();

  const requestType = findRequestType(requestTypeId);

  return (
    <table className="ticket-info-table">
      <tbody>
        <tr>
          <th>Customer</th>
          <td className="customer-info">
            <span className="name">{name}</span>
            <span className="phone">{phoneNumber}</span>
          </td>
        </tr>
        <tr>
          <th>Request type</th>
          <td>
            <div
              className={`request-type project-request-type-${requestTypeId}`}
            >
              {requestType.name}
            </div>
          </td>
        </tr>
        <tr>
          <th>Time tracking</th>
          <td className="time-tracking">
            <FontAwesomeIcon icon={faClock} className="icon" />
            <span className="text">{timeTracking} hours</span>
          </td>
        </tr>
        <tr>
          <th>Priority</th>
          <td className="priority">
            <FontAwesomeIcon
              icon={TicketPriorityIcon[TicketPriority[priority]]}
              className={`icon ticket-priority-${priority}`}
            />
            <span className="label">{TicketPriority[priority]}</span>
          </td>
        </tr>
      </tbody>
    </table>
  );
};

const CreatedAndUpdatedInfo = ({
  createdAt,
  updatedAt,
}: {
  createdAt: string;
  updatedAt: string;
}) => {
  const { number: createdNumber, unit: createdUnit } =
    calculateTimeDistance(createdAt);

  const { number: updatedNumber, unit: updatedUnit } =
    calculateTimeDistance(updatedAt);

  return (
    <div className="create-update-time">
      <div className="create-time">
        Created {createdNumber} {createdUnit} ago
      </div>
      <div className="update-time">
        Updated {updatedNumber} {updatedUnit} ago
      </div>
    </div>
  );
};

const TicketDetailModalContent: React.FC = () => {
  const {
    TicketsStore: { ticketDetail },
  } = useStores();

  const {
    _id,
    title,
    description,
    stageId,
    company,
    assignee,
    attachedFiles,
    createdAt,
    updatedAt,
  } = ticketDetail;

  return (
    <div className="ticket-detail-modal-content">
      <ContentHeader {...{ taskId: _id, taskTitle: title, stageId }} />
      <div className="content-body">
        <div className="left-section">
          <CreateInfo {...{ updatedAt, ...assignee }} />
          <Description {...{ description }} />
          <AttachedFiles {...{ attachedFiles }} />
          <StageTabs {...{ assignee }} />
          <ActionButtons />
        </div>
        <div className="right-section">
          <CompanyInfo {...{ company }} />
          <TicketInfoTable {...{ ticketDetail }} />
          <CreatedAndUpdatedInfo {...{ createdAt, updatedAt }} />
        </div>
      </div>
    </div>
  );
};

export default observer(TicketDetailModalContent);
