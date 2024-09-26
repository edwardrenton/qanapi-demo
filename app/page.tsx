"use client"

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Textarea } from "@/components/ui/textarea";
import { Separator } from "@/components/ui/separator";
import { useState } from "react";
import { encryptData } from "@/lib/qanapi";

export default function Page() {

  const [text, setText] = useState("")
  const [isLoading, setIsLoading] = useState(false)
  const [securedText, setSecuredText] = useState("")

  async function handleEncryptData() {
    setIsLoading(true)
    const encryptedData = await encryptData({
      fields: "text",
      classification: "test",
      data: { text }
    })
    setIsLoading(false)
    setSecuredText(encryptedData.text)
  }

  return (
    <div className="max-w-[1024px] px-4 py-20 mx-auto flex flex-col gap-4">
      <h3 className="text-2xl font-medium">Qanapi Demo</h3>
      <Card>
        <CardHeader>
          <CardTitle>Encrypt</CardTitle>
        </CardHeader>
        <CardContent className="space-y-2">
          <Textarea
            placeholder="Write some content to encrypt"
            defaultValue={text}
            onChange={(e) => {
              setText(e.target.value)
              setSecuredText("")
            }}
          />

          <div className="flex w-full justify-end">
            <Button onClick={handleEncryptData} disabled={isLoading || text.length === 0}>
              {isLoading ? "Encrypting..." : "Encrypt"}
            </Button>
          </div>

          <Separator />

          <div className="grid grid-cols-1 sm:grid-cols-2">
            <div className="flex flex-col gap-2">
              <p className="font-medium">Original Text</p>
              <span className={`break-words ${!text && "text-muted-foreground"}`}>
                {text || "N/A"}
              </span>
            </div>
            <div className="flex flex-col gap-2">
              <p className="font-medium">Encrypted Text</p>
              <span className={`break-words ${!securedText && "text-muted-foreground"}`}>
                {securedText || "N/A"}
              </span>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}