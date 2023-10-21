import React from 'react'
import prisma from '@/prisma/client'
import { notFound } from 'next/navigation'
import { Heading, Text, Flex, Card } from '@radix-ui/themes'
import IssueStatusBade from '@/app/components/IssueStatusBade'

interface Props {
  params: { id: string }
}

const IssueDetails = async ({ params }: Props) => {
  const issue = await prisma.issue.findUnique({
    where: { id: parseInt(params.id) },
  })

  if (!issue) return notFound()

  return (
    <div>
      <Heading>{issue.title}</Heading>
      <Flex className="space-x-3" my="2">
        <IssueStatusBade status={issue.status} />
        <Text>{issue.createdAt.toDateString()}</Text>
      </Flex>
      <Card>{issue.description}</Card>
    </div>
  )
}

export default IssueDetails
