
  async function post (parent, args, context) {
    const newLake = await context.prisma.lake.create({
      data:{
        name: args.name,
        longitude: args.longitude,
        latitude: args.latitude,
        maxDepth: args.maxDepth,
        surfaceLevel: args.surfaceLevel,
        surfaceArea: args.surfaceArea,
        catchmentArea: args.catchmentArea,
        countries: args.countries,
        isEdited: args.isEdited,
        isReviewed: args.isReviewed,
       }
    }) 
    return newLake
   }

   async function updateLake (parent, args, context) {
    const updatedLake = await context.prisma.lake.update({
      where:{id: parseInt(args.id)},
      data:{
        name: args.name,
        longitude: args.longitude,
        latitude: args.latitude,
        maxDepth: args.maxDepth,
        surfaceLevel: args.surfaceLevel,
        surfaceArea: args.surfaceArea,
        catchmentArea: args.catchmentArea,
        countries: args.countries,
        isEdited: args.isEdited,
        isReviewed: args.isReviewed,
       }
    }) 
    return updatedLake
   }
   
   function deleteLake(parent, args, context, info) {
    return context.prisma.lake.delete(
      {
        where: {id: parseInt(args.id)}
      },
      info,
    )
  }

  
  module.exports = {
    post,
    deleteLake,
    updateLake
  }