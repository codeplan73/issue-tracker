import prisma from '@/prisma/client'
import IssueAction from './IssueAction'
import { Status } from '@prisma/client'
import Pagination from '@/app/components/Pagination'
import IssueTable, { IssueQuery, columnNames } from './IssueTable'
import { Flex } from '@radix-ui/themes'
import { Metadata } from 'next'

interface Props {
  searchParams: IssueQuery
}

const IssuesPage = async ({ searchParams }: Props) => {
  const statuses = Object.values(Status)
  const status = statuses.includes(searchParams.status)
    ? searchParams.status
    : undefined
  const where = { status }

  const orderBy = columnNames.includes(searchParams.orderBy)
    ? { [searchParams.orderBy]: 'asc' }
    : undefined

  const page = parseInt(searchParams.page) || 1
  const pageSize = 10

  const issues = await prisma.issue.findMany({
    where,
    orderBy,
    skip: (page - 1) * pageSize,
    take: pageSize,
  })

  const totalCount = await prisma.issue.count({ where })

  return (
    <Flex direction="column" gap="3">
      <IssueAction />
      <IssueTable searchParams={searchParams} issues={issues} />
      <Pagination
        pageSize={pageSize}
        currentPage={page}
        itemCount={totalCount}
      />
    </Flex>
  )
}

export const dynamic = 'force-dynamic'

export const metadata: Metadata = {
  title: 'Issues Tracker = Issue list',
  description: 'View all issue project',
}

export default IssuesPage
