import { Document } from "mongoose";
import { Schema, Prop, SchemaFactory } from "@nestjs/mongoose";
import { FileStore } from "@project/core";

@Schema({
  collection: 'files',
  timestamps: true,
  toJSON: { virtuals: true },
  toObject: { virtuals: true }
})

export class FileStoreModel extends Document implements FileStore {
  @Prop({required: true})
  public originalName!: string;

  @Prop({required: true})
  public subDirectory!: string;

  @Prop({required: true})
  public size!: number;

  @Prop({required: true})
  public mimetype!: string;

  @Prop({required: true})
  public hashName!: string;

  @Prop({required: true})
  public path!: string;

  public createdAt!: Date;
  public updatedAt!: Date;

  public override id?: string;
}

export const FileStoreSchema = SchemaFactory.createForClass(FileStoreModel);

FileStoreSchema.virtual('id').get(function() {
  // @ts-ignore
  return this._id.toString();
});

