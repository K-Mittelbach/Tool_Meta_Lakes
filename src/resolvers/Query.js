function Lakes(parent,args,context,info) {
    return context.prisma.lake.findMany()
  }

 

  module.exports={
      Lakes,
     
  }