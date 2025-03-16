import { PrismaClient } from "@prisma/client";
import { nanoid } from "nanoid";
import { z } from "zod";
import { publicProcedure, router } from ".";



const prisma = new PrismaClient();

export const appRouter = router({
    // create a channel router
    createChannel: publicProcedure
    .input(
      z.object({
        name: z.string(),
        companyname: z.string(),
        userId: z.string(),
        tag: z.string(),
      })
    )
    .mutation(async ({ input }) => {
      const inviteLink = nanoid(10); 
      const channel = await prisma.channel.create({
        data: {
          name: input.name,
          inviteLink,
          companyname: input.companyname,
          mentorId: input.userId,
          status: 'Active',
          tag: input.tag
        },
      });
      return channel;
    }),

    // get channel information
    getchannelsList: publicProcedure
    .input(
      z.object({
        mentorId: z.string(),
      })
    )
    .query(async ({ input }) => {
        const { mentorId } = input;
        return prisma.channel.findMany({
          where: { 
            mentorId
          }
        });
    }),

    // get user by id
    getuser:publicProcedure
    .input(
      z.object({
        id: z.string(),
      })
    )
    .query(async ({ input }) => {
      return await prisma.user.findUnique({ where: { id: input.id } });
    }),

    // Get channel by invite code
    getByInviteCode: publicProcedure
    .input(
      z.object({
        inviteCode: z.string(),
      })
    )
    .query(async ({ input }) => {
      return prisma.channel.findUnique({
        where: { inviteLink: input.inviteCode },
        include: { members: true },
      });
    }),

    // Join channel
    joinChannel: publicProcedure
      .input(
        z.object({
          inviteCode: z.string(),
          userId: z.string(),
        })
      )
      .mutation(async ({ input }) => {
        const channel = await prisma.channel.findUnique({
          where: { inviteLink: input.inviteCode },
          include: { members: true },
        });

        if (!channel) throw new Error("Channel not found");
        if (channel.members.some((m) => m.id === input.userId )) {
          throw new Error("Already a member");
        }

        return prisma.channel.update({
          where: { id: channel.id },
          data: {
            members: {
              connect: { id: input.userId },
            },
          },
        });
      }),
});

export type AppRouter = typeof appRouter;