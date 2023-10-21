import React from 'react'
import prisma from '@/prisma/client'
import { notFound } from 'next/navigation'
import { Heading, Text, Flex, Card, Box } from '@radix-ui/themes'
import IssueStatusBade from '@/app/components/IssueStatusBadge'
import ReactMarkdown from 'react-markdown'

interface Props {
  params: { id: string }
}

const IssueDetails = async ({ params }: Props) => {
  const issue = await prisma.issue.findUnique({
    where: { id: parseInt(params.id) },
  })

  if (!issue) return notFound()

  return (
    <Box className="max-w-xl">
      <Heading>{issue.title}</Heading>
      <Flex className="space-x-3" my="4">
        <IssueStatusBade status={issue.status} />
        <Text>{issue.createdAt.toDateString()}</Text>
      </Flex>
      <Card className="prose" mt="4">
        <ReactMarkdown>{issue.description}</ReactMarkdown>
      </Card>
    </Box>
  )
}

export default IssueDetails
